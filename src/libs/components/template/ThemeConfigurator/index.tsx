/* eslint-disable @typescript-eslint/no-unused-vars */
import ModeSwitcher from "./ModeSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
// import LayoutSwitcher from './LayoutSwitcher'
// import DirectionSwitcher from './DirectionSwitcher'

export type ThemeConfiguratorProps = {
    callBackClose?: () => void;
};

const ThemeConfigurator = (/* { callBackClose }: ThemeConfiguratorProps */) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-y-10 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h6 className="dark:text-white">Dark Mode</h6>
                        <span className="dark:text-gray-400 text-sm">
                            Switch theme to dark mode
                        </span>
                    </div>
                    <ModeSwitcher />
                </div>
                {/*   <div className="flex items-center justify-between">
                    <div>
                        <h6>Direction</h6>
                        <span>Select a direction</span>
                    </div>
                         <DirectionSwitcher callBackClose={callBackClose} />
                </div> */}

                <div>
                    <h6 className="mb-3 dark:text-white">Theme</h6>
                    <ThemeSwitcher />
                </div>
                {/*  <div>
                    <h6 className="mb-3">Layout</h6>
                    <LayoutSwitcher />
                </div> */}
            </div>
        </div>
    );
};

export default ThemeConfigurator;
