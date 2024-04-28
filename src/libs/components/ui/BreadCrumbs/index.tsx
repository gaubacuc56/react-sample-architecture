/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Link, useMatches } from "react-router-dom";
import React from "react";

const Breadcrumbs = () => {
    const matches = useMatches();
    const validMatches = matches.filter((match) =>
        Boolean(match.handle?.crumb)
    );

    return (
        <div className="h-6 w-[224px] pt-1">
            {validMatches.map((match, index) => {
                const crumbName = match.handle?.crumb(match);
                const isActive = index === validMatches.length - 1;
                return (
                    <span key={match.id}>
                        {index !== 0 && (
                            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white" />
                        )}
                        {isActive ? (
                            crumbName
                        ) : (
                            <Link
                                to={match.pathname}
                                className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                            >
                                {crumbName}
                            </Link>
                        )}
                    </span>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;
