import { FC, useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { googleSetting } from 'shared/const/googleSetting';

interface LoginButtonProps {
    onClick?: (token: string) => void;

}

export const LoginButton: FC<LoginButtonProps> = ({ onClick }) => {
    const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('tokenId' in res) {
            onClick(res.tokenId);
        }
    };
    const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    };

    return (
        <GoogleLogin
            clientId={googleSetting.clientId}
            buttonText='Login'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy='single_host_origin'
        />
    );
};
