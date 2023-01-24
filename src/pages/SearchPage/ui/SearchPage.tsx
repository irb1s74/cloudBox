import { FC } from 'react';
import { Page } from 'widget/Page';

interface SearchPageProps {
    className?: string;
}

const SearchPage: FC<SearchPageProps> = ({ className }) => {
    return <Page pageName="Поиск">поиск</Page>;
};

export default SearchPage;
