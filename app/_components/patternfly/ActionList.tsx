"use client";
/*
 * Created on Mon Oct 02 2023
 * Author: Connor Doman
 */
import React from "react";
import {
    ActionList,
    ActionListItem,
    Button,
    Dropdown,
    DropdownList,
    DropdownItem,
    MenuToggle,
    MenuToggleElement,
    Divider,
} from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

export const ActionListSingleGroup: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onToggle = () => {
        setIsOpen(!isOpen);
    };

    const onSelect = (event: React.MouseEvent<Element, MouseEvent> | undefined) => {
        event?.stopPropagation();
        setIsOpen(!isOpen);
    };

    const dropdownItems = (
        <>
            <DropdownItem to="#" key="link">
                Link
            </DropdownItem>
            <DropdownItem key="action">Action</DropdownItem>
            <DropdownItem to="#" key="disabled link" isDisabled>
                Disabled Link
            </DropdownItem>
            <DropdownItem key="disabled action" isDisabled>
                Disabled Action
            </DropdownItem>
            <Divider component="li" key="separator" />
            <DropdownItem to="#" key="separated link">
                Separated Link
            </DropdownItem>
            <DropdownItem key="separated action">Separated Action</DropdownItem>
        </>
    );
    return (
        <React.Fragment>
            <ActionList>
                <ActionListItem>
                    <Button variant="primary" id="single-group-next-button">
                        Next
                    </Button>
                </ActionListItem>
                <ActionListItem>
                    <Button variant="secondary" id="single-group-back-button">
                        Back
                    </Button>
                </ActionListItem>
            </ActionList>
            <br />
            With kebab
            <ActionList>
                <ActionListItem>
                    <Button variant="primary" id="single-group-next-button2">
                        Next
                    </Button>
                </ActionListItem>
                <ActionListItem>
                    <Button variant="secondary" id="single-group-back-button2">
                        Back
                    </Button>
                </ActionListItem>
                <ActionListItem>
                    <Dropdown
                        onSelect={onSelect}
                        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                            <MenuToggle
                                ref={toggleRef}
                                onClick={onToggle}
                                variant="plain"
                                isExpanded={isOpen}
                                aria-label="Action list single group kebab">
                                <EllipsisVIcon />
                            </MenuToggle>
                        )}
                        isOpen={isOpen}
                        onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}>
                        <DropdownList>{dropdownItems}</DropdownList>
                    </Dropdown>
                </ActionListItem>
            </ActionList>
        </React.Fragment>
    );
};

interface ButtonAction {
    action: string;
    linkTo?: string;
    onClick?: () => void;
}

interface ActionButtonsProps {
    actions: ButtonAction[];
    withKebab?: boolean;
    kebabActions?: ButtonAction[];
}

export const ActionButtons = ({ actions, withKebab, kebabActions }: ActionButtonsProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const onSelect = (event: React.MouseEvent<Element, MouseEvent> | undefined) => {
        event?.stopPropagation();
        setIsOpen(!isOpen);
    };

    const buttons = actions.map((buttonAction, index) => {
        return (
            <ActionListItem key={index}>
                <Button onClick={buttonAction.onClick} variant={index > 0 ? "secondary" : "primary"}>
                    {buttonAction.action}
                </Button>
            </ActionListItem>
        );
    });

    const kebabMenu = (
        <>
            {withKebab && kebabActions ? (
                <Dropdown
                    onSelect={onSelect}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                        <MenuToggle
                            ref={toggleRef}
                            onClick={handleToggle}
                            variant="plain"
                            isExpanded={isOpen}
                            aria-label="Action list single group kebab">
                            <EllipsisVIcon />
                        </MenuToggle>
                    )}
                    isOpen={isOpen}
                    onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}>
                    {kebabActions
                        ? kebabActions.map((action, index) => {
                              return (
                                  <DropdownItem to={action.linkTo} key={index}>
                                      {action.action}
                                  </DropdownItem>
                              );
                          })
                        : null}
                </Dropdown>
            ) : null}
        </>
    );

    return (
        <ActionList>
            {buttons}
            {withKebab && <ActionListItem>{kebabMenu}</ActionListItem>}
        </ActionList>
    );
};
