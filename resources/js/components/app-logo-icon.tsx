import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <image
                // href="/project_logo/favicon-96x96.png"
                href="/project_logo/logo_kubr.png"
                width="96"
                height="96"
            />
        </svg>
    );
}
