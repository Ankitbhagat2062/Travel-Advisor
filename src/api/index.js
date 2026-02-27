import axios from 'axios';
// const URL = process.env.REACT_APP_RAPID_API_URL

export const getPlaceData = async ({ type, sw, ne }) => {
    try {
        const { data: { data } } = await axios.request(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-key': '64bc93994emsh7473d88f1f87767p198a6ajsn71e5e16c3386',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }
}
export const data = [

    {
        address: '',
        address_obj: {
            street1: 'Lo D3, Khu Du Lich Ban Dao , Cam Ranh , Cam Hai Dong , Cam Lam , Khanh Hoa , The Anam , Cam Ranh',
            street2: null,
            city: 'Cam Ranh',
            state: null,
            country: 'Vietnam',
        },
        ancestors: [
            { subcategory: { key: 'city', name: 'City' }, name: 'Cam Ranh', abbrv: null, location_id: '1025208' },
            { subcategory: { key: 'city', name: 'City' }, name: 'Cam Ranh', abbrv: null, location_id: '1025208' },
            { subcategory: { key: 'city', name: 'City' }, name: 'Cam Ranh', abbrv: null, location_id: '1025208' }
        ],
        awards: [],
        bearing: "south",
        category: { key: 'restaurant', name: 'Restaurant' },
        cuisine: [{ key: '10675', name: 'Vietnamese' }],
        description: '',
        dietary_restrictions: [],
        distance: null,
        distance_string: null,
        doubleclick_zone: "as.vietnam",
        establishment_types: [{ key: '10591', name: 'Restaurants' }],
        hours: {
            week_ranges: [
                [{ open_time: 660, close_time: 1320 }],
                [{ open_time: 660, close_time: 1320 }],
                [{ open_time: 660, close_time: 1320 }],
                [{ open_time: 660, close_time: 1320 }],
                [{ open_time: 660, close_time: 1320 }],
                [{ open_time: 660, close_time: 1320 }],
                [{ open_time: 660, close_time: 1320 }]
            ],
            timezone: 'Asia/Ho_Chi_Minh'
        },
        is_candidate_for_contact_info_suppression: false,
        is_closed: false,
        is_jfy_enabled: false,
        is_long_closed: false,
        latitude: "11.91828",
        location_id: "32871525",
        location_string: "Cam Ranh, Khanh Hoa Province",
        longitude: "109.13807",
        name: "Lang Viet Restaurant",
        nearest_metro_station: [],
        num_reviews: "1",
        open_now_text: "Open Now",
        parent_display_name: "Cam Ranh",
        phone: "+84 258 3989 499",
        photo: {
            caption: "",
            helpful_votes: "1",
            id: "782941009",
            images: {
                large: { width: '550', url: 'https://media-cdn.tripadvisor.com/media/photo-s/2e/aa/bb/51/caption.jpg', height: '412' },
                medium: { width: '250', url: 'https://media-cdn.tripadvisor.com/media/photo-f/2e/aa/bb/51/caption.jpg', height: '188' },
                original: { width: '1280', url: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/2e/aa/bb/51/caption.jpg', height: '960' },
                small: { width: '150', url: 'https://media-cdn.tripadvisor.com/media/photo-l/2e/aa/bb/51/caption.jpg', height: '150' },
                thumbnail: { width: '50', url: 'https://media-cdn.tripadvisor.com/media/photo-t/2e/aa/bb/51/caption.jpg', height: '50' }
            },
            is_blessed: false,
            published_date: "2025-01-26T14:50:09-0500",
            uploaded_date: "2025-01-26T12:46:31-0500",
            user: { user_id: null, member_id: '0', type: 'user' },
        },
        preferred_map_engine: "default",
        price_level: "",
        ranking: "#13 of 30 Restaurants in Cam Ranh",
        ranking_category: "restaurant",
        ranking_denominator: "25",
        ranking_geo: "Cam Ranh",
        ranking_geo_id: "1025208",
        ranking_position: "16",
        rating: "5.0",
        raw_ranking: "3.039813756942749",
        subcategory: [],
        timezone: "Asia/Ho_Chi_Minh",
        web_url: "https://www.tripadvisor.com/Restaurant_Review-g1025208-d32871525-Reviews-Lang_Viet_Restaurant-Cam_Ranh_Khanh_Hoa_Province.html",
        write_review: ''
    },
]