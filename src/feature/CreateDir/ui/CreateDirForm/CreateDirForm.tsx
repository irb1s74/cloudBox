import { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Form } from 'shared/ui/Form/Form';
import { useCreateDirMutation } from '../../api/createDir';
import { getNameDir } from '../../model/selectors/getNameDir/getNameDir';
import {
    createDirActions,
    createDirReducer,
} from '../../model/slice/createDirSlice';

const initialReducers: ReducersList = {
    createDir: createDirReducer,
};

export interface CreateDirFormProps {
    handleCloseModal: () => void;
}

const CreateDirForm: FC<CreateDirFormProps> = ({ handleCloseModal }) => {
    const dispatch = useAppDispatch();
    const name = useSelector(getNameDir);
    const [usePath] = useSearchParams();
    const path = usePath.get('path');
    const [formError, setFormError] = useState('');

    const [createDir, { isLoading }] = useCreateDirMutation();

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(createDirActions.setNameDir(event.target.value));
    };

    const onClick = () => {
        createDir({ path: path || '', name })
            .unwrap()
            .then(() => {
                handleCloseModal();
            })
            .catch((error) => {
                if (error?.data?.message) {
                    setFormError(error.data.message);
                }
            });
    };

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Form
                titleForm="Создать директорию"
                error={formError}
                actions={
                    <Button
                        onClick={onClick}
                        disabled={isLoading}
                        variant="contained"
                        fullWidth
                    >
                        Создать
                    </Button>
                }
                handleClose={handleCloseModal}
            >
                <TextField
                    value={name}
                    onChange={handleOnChangeName}
                    variant="outlined"
                    label="Название директории"
                    fullWidth
                />
            </Form>
        </DynamicModuleLoader>
    );
};

export default CreateDirForm;
