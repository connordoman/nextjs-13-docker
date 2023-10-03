/*
 * Created on Mon Oct 02 2023
 * Author: Connor Doman
 */

import Heading from "../_components/Heading";
import { ActionButtons, ActionListSingleGroup } from "../_components/patternfly/ActionList";

import { NextPage } from "next";

const ExperimentalPage: NextPage = () => {
    return (
        <div className="flex flex-col w-2/3 mx-auto bg-slate-200 min-h-screen p-4">
            <Heading level={1}>Hello</Heading>
            <ActionListSingleGroup />
            <ActionButtons
                actions={[{ action: "Next" }, { action: "Back" }]}
                withKebab={true}
                kebabActions={[{ action: "Save" }, { action: "Quit" }, { action: "Help" }]}
            />
        </div>
    );
};

export default ExperimentalPage;
