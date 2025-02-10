import RecipePreviewCard from "./cards/RecipePreviewCard";

function TestCards() {
    return (
        <>
            <RecipePreviewCard
                recipe={{
                    id:1,
                    title: 'Chilaquiles Verdes Topped with Fried Egg',
                    desc: 'Delicious Mexican breakfast as spicy as you can handle, featuring crispy tortilla chips smothered in tangy salsa verde, crema, and fresh cilantro.',
                    tags: ['Breakfast', 'Mexican', 'Spicy'],
                    photo: 'https://www.seriouseats.com/thmb/wceJtot3qMjXcVAnk6PBw_OhxRw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chilaquiles-verdes-fried-eggs-hero-01_1-d18b82d02fa54c92a05e66881e906814.JPG',
                    timestamp: new Date().toLocaleDateString(),
                    user: {
                    name: 'Jonathan Salazo',
                    photo: "https://randomuser.me/api/portraits/thumb/men/89.jpg"
                    }
                }}
            />
            <RecipePreviewCard
                recipe={{
                    id:2,
                    title: 'Spaghetti Carbonara',
                    desc: 'A classic Roman pasta dish with a creamy sauce made from eggs, Pecorino Romano, pancetta, and black pepper.',
                    tags: ['Dinner', 'Italian', 'Comfort Food'],
                    photo: 'https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg',
                    timestamp: new Date().toLocaleDateString(),
                    user: {
                    name: 'Luca Bianchi',
                    photo: "https://randomuser.me/api/portraits/thumb/men/45.jpg"
                    }
                }}
            />
            <RecipePreviewCard
                recipe={{
                    id: 3,
                    title: 'Japanese Matcha Pancakes',
                    desc: 'Fluffy, soufflé-style pancakes with a hint of matcha, served with fresh berries and whipped cream.',
                    tags: ['Breakfast', 'Japanese', 'Dessert'],
                    photo: 'https://indyassa.com/wp-content/uploads/2023/01/0_IMG_2233.jpg',
                    timestamp: new Date().toLocaleDateString(),
                    user: {
                    name: 'Haruka Tanaka',
                    photo: "https://randomuser.me/api/portraits/thumb/women/32.jpg"
                    }
                }}
            />


        </>
    )
}

export default TestCards;