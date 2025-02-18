'use client'
import { v4 as uuidv4 } from "uuid";
import unorm from "unorm";
import Card from "../_components/cards/Card";
import { Button } from "../_components/ui/Buttons";

const titleToSlug = (title: string) =>
    unorm.nfd(title)
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') 
      .trim();

function page() {

    const handleSend = ()=>{
        fetch('https://api.platelette.com/test', {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify({
            id: uuidv4(),
            title: 'New Fast and Easy Recipe Made With Tofu',
            description: 'Why eat anything else?',
            slug: titleToSlug('New Fast and Easy Recipe Made With Tofu')
        })})
        .then(res => {
            if (res.ok) console.log('Success')
        })
        .catch(err => {
            console.error(err);
        }) 
    }

  return (
    <div>
        <Card>
            <Button onClick={handleSend}>Send New Recipe</Button>
        </Card>
    </div>
  )
}

export default page