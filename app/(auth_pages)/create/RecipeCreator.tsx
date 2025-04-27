'use client'
import CheckboxTabs from '@/app/_components/ui/CheckboxTabs';
import SectionHeading from '@/app/_components/ui/SectionHeading';
import {useEffect, useState} from 'react';
import AICreate from './AICreate';
import RecipeForm from './RecipeForm';
import PageWrapper from '@/app/_components/ui/PageWrapper';
import IngredientCreate from './IngredientCreate';
import { useSearchParams } from 'next/navigation';

const methods = ['AI', 'Ingredients', 'Manual'];
enum Method {
    AI = 0,
    INGREDIENTS = 1,
    MANUAL = 2
}

function MethodSwitcher({idx}: {idx: Method}) {
        switch (idx) {
            case Method.AI:
                return <AICreate />;
            case Method.INGREDIENTS:
                return <IngredientCreate />;
            case Method.MANUAL:
                return <RecipeForm />;
            default:
                return <div>Select a method above</div>;
        }
    }

function RecipeCreator() {

    const [method, setMethod] = useState<Method>(Method.AI);
    const searchParams = useSearchParams();

    useEffect(()=>{
        const methodParam = searchParams.get('method');
        if (methodParam) {
            const idx = methods.indexOf(methodParam);
            if (idx !== -1) {
                setMethod(idx);
            }
        }
    }, [searchParams])

    return (
        <PageWrapper>
            <SectionHeading className='mb-4'>
                New Recipe
            </SectionHeading>
            <CheckboxTabs
                idx={method}
                setIdx={setMethod}
                labels={methods}
            />
            <MethodSwitcher idx={method} />
        </PageWrapper>
    );
};

export default RecipeCreator;;