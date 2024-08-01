import mongoose from "mongoose";
import reviews from './reviewModel.js'
import axios from 'axios';

//Logic to post a review
const submitReview = async(req, res) =>{
    const {date, rating, description} = req.body

    //add doc to db
    try {
        const review = await reviews.create({date, rating, description})
        res.status(200).json(review)
    }
    catch (error)
    {
        res.status(400).json(req.body)
    }
}

//Logic to Get all Reviews
const getReviews = async(req, res) => {

    try{
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

    //strip the ID from the URL
    const {url} = req.body
    let propertyId = extractId(url)

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
        console.log(JSON.stringify(response.data));
        
    })

    .catch((error) => {
        console.log(error);
    });
}

export {submitReview, getReviews, getHouseDetails}