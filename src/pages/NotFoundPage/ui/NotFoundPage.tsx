import { FC } from 'react';
import { Page } from 'widget/Page';
import { NotFound } from 'shared/ui/NotFound/NotFound';

interface NotFoundProps {
    className?: string;
}

export const NotFoundPage: FC<NotFoundProps> = ({ className }) => (
    <Page>
        <NotFound />
    </Page>
);
