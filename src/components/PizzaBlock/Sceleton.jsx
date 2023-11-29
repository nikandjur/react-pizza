import React from "react";
import ContentLoader from "react-content-loader";

const Sceleton = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="134" cy="121" r="113" />
        <rect x="0" y="259" rx="10" ry="10" width="280" height="30" />
        <rect x="-2" y="312" rx="10" ry="10" width="280" height="80" />
        <rect x="6" y="421" rx="0" ry="0" width="80" height="33" />
        <rect x="123" y="415" rx="22" ry="22" width="152" height="46" />
    </ContentLoader>
);

export default Sceleton;
