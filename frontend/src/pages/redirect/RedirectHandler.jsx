import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUrlMetadata } from "../../api/url.api";

import LoadingRedirect from "../../components/redirect/LoadingRedirect";

import {hitUrlOnce} from "../../api/axios";

function RedirectHandler() {

    const { shortCode } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const hitUrl = async () => {
            try {
                const res = await hitUrlOnce(shortCode);
            } catch (err) {
                console.error(err);
            }
        };

        hitUrl();
    }, [shortCode]);

    useEffect(() => {

        const resolveUrl = async () => {

            try {

                const response =
                    await getUrlMetadata(shortCode);
                const data = response.data;

                switch (data.status) {

                    case "redirect":

                        window.location.href =
                            data.redirectUrl;

                        break;

                    case "password":

                        navigate(
                            `/protected/${shortCode}`,
                            {
                                replace: true,
                            }
                        );

                        break;

                    case "expired":

                        navigate(
                            "/expired",
                            {
                                replace: true,
                            }
                        );

                        break;

                    case "inactive":

                        navigate(
                            "/inactive",
                            {
                                replace: true,
                            }
                        );

                        break;

                    default:

                        navigate(
                            "/404",
                            {
                                replace: true,
                            }
                        );

                }

            } catch {

                navigate(
                    "/404",
                    {
                        replace: true,
                    }
                );

            }

        };

        resolveUrl();

    }, []);

    return <LoadingRedirect />;

}

export default RedirectHandler;