import mongoose from "mongoose";
import reviews from './reviewModel.js'
import axios from 'axios';

//Global Value of Property_ID
let propertyId = null;

//Logic to post a review
const submitReview = async(req, res) =>{
    const {date, rating, description} = req.body
    console.log(`House propertyId: ${propertyId}`);  // You can access the propertyId here
    console.log(typeof propertyId);
    //add doc to db
    try {
        const response = await axios.get('http://localhost:5000/data', {
            params: {
                param1: description,
            }
        });
        const data = response.data
        if (!propertyId) {
            console.log("Review Creation Failed: Invalid Property ID.");
            return res.status(400).json({ message: "Invalid Property ID." });
        }
        if (data[0] == 1)
        {
            const review = await reviews.create({date, rating, description, propertyId})
            
            console.log("Review Creation Successful!")
            res.status(200).json(review)
        }
        else
        {
            console.log("Inappropiate Description, Review Creation Failed.")
            res.status(400).json(req.body)
        }
        
    }
    catch (error)
    {
        res.status(400).json(req.body)
    }
}

//Logic to Get all Reviews
const getReviews = async(req, res) => {

    try {
        const everyone = await reviews.find({}).sort({createdAt: -1}) //sort by descending order
        res.status(200).json(everyone) //gives us user documents in an array
    }
    catch (error)
    {
        res.status(400).json(req.body)
    }
}

//Helper Function
function extractId(url) {
    const parts = url.split('_M');
    if (parts.length > 1) {
      let idPart = parts[1]
      
      if (idPart.includes('?from=srp-list-card'))
      {
          idPart = idPart.replace('?from=srp-list-card', '');
      }
      
      if (idPart.includes('-'))
      {
          idPart = idPart.replace('-', '');
      }
      
      return idPart;
    }
    return null;
  }

//Get Website Details
const getHouseDetails = async(req, res) => {

    const home_details = {
        "address": null,
        "baths": null,
        "sqft": null,
        "bedrooms": null
    }
    
    //strip the ID from the URL
    const {url} = req.body
    propertyId = extractId(url)
    
    let data = JSON.stringify({
    query: `query SpotOfferEvaluation($propertyId: ID!, $requestOrigin: String!, $partners: [String]) {
    spot_offer_evaluation(property_id: $propertyId) {
        property_id
        spot_offer(request_origin: $requestOrigin, partners: $partners) {
        component_type
        cta_url
        evaluation {
            is_qualified
            provider_id
            product_id
            partner_logo
            offer {
            value
            __typename
            }
            __typename
        }
        property_details {
            status
            description {
            property_type
            beds
            baths_full
            baths_half
            sqft
            lot_sqft
            year_built
            __typename
            }
            address {
            line
            city
            state_code
            postal_code
            __typename
            }
            last_sold_price
            last_sold_date
            home_estimate {
            value
            source
            __typename
            }
            __typename
        }
        __typename
        }
        __typename
    }
    }`,
    variables: {"propertyId":propertyId,"requestOrigin":"pdp_spot_offer","partners":["homeward","offerpad"]}
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.realtor.com/frontdoor/graphql',
        headers: { 
            'rdc-client-name': 'RDC_WEB_DETAILS_PAGE', 
            'rdc-client-version': '2.0.1146', 
            'Content-Type': 'application/json', 
        },
        data : data
    };

    //Send Request to Realtor.com Backend
    axios.request(config)
    .then((response) => {
        // console.log(JSON.stringify(response.data));
        const jsonData = response.data;
        const parsedData = jsonData;

        const beds = parsedData.data.spot_offer_evaluation.spot_offer.property_details.description.beds;
        const baths_full = parsedData.data.spot_offer_evaluation.spot_offer.property_details.description.baths_full;
        const baths_half = parsedData.data.spot_offer_evaluation.spot_offer.property_details.description.baths_half;
        const sqft = parsedData.data.spot_offer_evaluation.spot_offer.property_details.description.sqft;
        const addressDetails = parsedData.data.spot_offer_evaluation.spot_offer.property_details.address;

        home_details.address = addressDetails;
        home_details.baths = baths_full + 0.5*(baths_half);
        home_details.sqft = sqft;
        home_details.bedrooms = beds;

        //Send Data Back to the Front-End
        console.log(home_details)
        res.status(200).json(home_details)
    })

    .catch((error) => {
        console.log(error);
    });

    
}

export {submitReview, getReviews, getHouseDetails}