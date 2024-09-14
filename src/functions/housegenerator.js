function generateHouses(numHouses) {
    const homes = []

    const houseTemplates = {
        "house1": {
            "home-type": "House",
            "price": { min: 250000, max: 3000000, concentrated: 400000, baseSizeFactor: 150, baseBathFactor: 50000 },
            "size": { min: 1500, max: 10000, concentrated: 4500 },
            "parking_am": { min: 0, max: 5, concentrated: 3 },
            "parking_garage": [true, false],
            "setting": {
                weights: { urban: 0.1, suburban: 0.4, rural: 0.2, beachside: 0.15, forest: 0.15 }
            },
            "schools": { great: 0.15, good: 0.25, mid: 0.3, poor: 0.15, bad: 0.15 },
            "bathrooms": { min: 1, max: 6, concentrated: 3 },
            "basement": { trueWeight: 0.75 },
            "basement_furnished": [true, false],
            "attic": [true, false],
            "AC": [true, false],
            "heat": [true, false],
            "gated": [true, false],
            "pool": [true, false]
        },
        "house2": {
            "home-type": "Townhouse",
            "price": { min: 150000, max: 2000000, concentrated: 250000, baseSizeFactor: 200, baseBathFactor: 30000 },
            "size": { min: 1000, max: 5000, concentrated: 2000 },
            "parking_am": { min: 0, max: 3, concentrated: 1 },
            "parking_garage": [true, false],
            "setting": {
                weights: { city_center: 0.4, urban: 0.4, beachside: 0.2 }
            },
            "schools": { great: 0.15, good: 0.25, mid: 0.3, poor: 0.15, bad: 0.15 },
            "bathrooms": { min: 1, max: 4, concentrated: 2 },
            "basement": [true, false],
            "basement_furnished": [true, false],
            "attic": [true, false],
            "AC": [true, false],
            "heat": [true, false],
            "gated": [true, false],
            "ammenities": [true, false], // Will only be true if gated is true
            "pool": [true, false]
        },
        "house3": {
            "home-type": "Condo",
            "price": { min: 150000, max: 2500000, concentrated: 300000, baseSizeFactor: 300, baseBathFactor: 25000 },
            "size": { min: 500, max: 3000, concentrated: 1000 },
            "parking_am": { min: 0, max: 3, concentrated: 1 },
            "parking_garage": [true, false],
            "setting": {
                weights: { city_center: 0.65, urban: 0.1, beachside: 0.25 }
            },
            "schools": { great: 0.15, good: 0.25, mid: 0.3, poor: 0.15, bad: 0.15 },
            "bathrooms": { min: 1, max: 4, concentrated: 1 },
            "basement": [false],
            "basement_furnished": [false],
            "attic": [false],
            "AC": [true, false],
            "heat": [true, false],
            "gated": [true, false],
            "ammenities": [true, false],
            "pool": [true, false]
        }
    }

    function getRandomElement(arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            return arr[Math.floor(Math.random() * arr.length)]
        } else {
            throw new Error("The argument is not a valid array or is empty.")
        }
    }

    function getBiasedRandom(min, max, concentrated) {
        let rand = Math.random() * (max - min) + min
        let diff = rand - concentrated
        rand = concentrated + diff * 0.4
        rand = Math.max(min, Math.min(rand, max))
        if (rand > 1000) {
            return Math.round(rand / 1000) * 1000
        }
        return Math.round(rand)
    }

    function getWeightedRandom(weights) {
        let sum = 0
        for (let key in weights) sum += weights[key]
        let random = Math.random() * sum
        let cumulative = 0
        for (let key in weights) {
            cumulative += weights[key]
            if (random <= cumulative) return key
        }
    }

    function getTrueWithChance(chance) {
        return Math.random() < chance
    }

    function calculatePrice(basePrice, size, bathrooms, amenitiesFactor, setting) {
        let baseSizeFactor = basePrice.sizeFactor || 0 // Ensure these are not undefined
        let baseBathFactor = basePrice.bathFactor || 0
        
        let price = getBiasedRandom(basePrice.min, basePrice.max, basePrice.concentrated) + (size * baseSizeFactor) + bathrooms * baseBathFactor
        price += amenitiesFactor * 40000
    
        // regional price changes
        if (setting === 'city_center') { price *=2 }
        if (setting === 'suburban') { price *=1.5 }
        if (setting === 'beachside') { price *=3 }
        if (setting === 'forest') { price /=3 }
        if (setting === 'rural') { price /=2 }

        // Ensure price is a number
        if (isNaN(price) || isNaN(basePrice.min) || isNaN(basePrice.max)) {
            console.error('NaN detected in price calculation:', {
                price,
                basePrice
            })
        }
    
        return Math.min(basePrice.max, Math.max(basePrice.min, price))
    }
    

    for (let i = 0; i < numHouses; i++) {
        const houseType = getRandomElement(Object.keys(houseTemplates))
        const template = houseTemplates[houseType]

        let size = getBiasedRandom(template.size.min, template.size.max, template.size.concentrated)
        let bathrooms = getBiasedRandom(template.bathrooms.min, template.bathrooms.max, template.bathrooms.concentrated)
        let parking_am = getBiasedRandom(template.parking_am.min, template.parking_am.max, template.parking_am.concentrated)

        let house = {
            "home-type": template["home-type"],
            "size": size,
            "bathrooms": bathrooms,
            "parking_am": parking_am,
            "setting": getWeightedRandom(template.setting.weights),
            "schools": getWeightedRandom(template.schools),
            "basement": getTrueWithChance(template.basement ? template.basement.trueWeight : 0.5),
            "attic": getRandomElement(template.attic),
            "AC": getRandomElement(template.AC),
            "heat": getRandomElement(template.heat),
            "gated": getRandomElement(template.gated),
            "pool": getRandomElement(template.pool),
        }

        // Conditional logic for basement_furnished
        house["basement_furnished"] = house["basement"] ? getRandomElement(template.basement_furnished) : false

        // Conditional logic for parking_garage
        house["parking_garage"] = house["parking_am"] > 0 ? getRandomElement([true, false]) : false

        // Conditional logic for ammenities (only true if gated is true)
        if (template.ammenities) {
            house["ammenities"] = house["gated"] ? getRandomElement([true, false]) : false
        }

        // Price adjustment based on size, bathrooms, and amenities
        let amenitiesFactor = 0
        if (house.basement) amenitiesFactor++
        if (house.attic) amenitiesFactor++
        if (house.a_c) amenitiesFactor++
        if (house.heat) amenitiesFactor++
        if (house.gated) amenitiesFactor++
        if (house.pool) amenitiesFactor++

        house["price"] = calculatePrice(template.price, size, bathrooms, amenitiesFactor, house['setting'])

        homes.push(house)
    }

    return homes
}

function housegenerator(amount) {
    return generateHouses(amount)
}

export default housegenerator