import Card from "../_components/cards/Card";
import SectionHeading from "../_components/ui/SectionHeading";

function AboutPage() {
    return (
        <>
            <SectionHeading>About Us</SectionHeading>
            <Card className="grid place-items-center">
                <p className="text-center text-primary2 text-2xl font-heading font-bold">More to Come!</p>
                <p className="text-foreground">Check back soon for updates...</p>
            </Card>
        </>
    )
}

export default AboutPage;