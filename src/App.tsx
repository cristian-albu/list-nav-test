import React from "react";
import "./App.css";

const listItems = ["1312tfsadas", "sadasd1531", "asdh141asddasd"];

type TListItem = {
    id: string;
    index: number;
    focusState: number;
    optional?: number;
};

const ListItem = ({ id, index, focusState }: TListItem) => {
    const liRef = React.useRef<HTMLLIElement | null>(null);

    React.useEffect(() => {
        console.log(focusState);
        if (index === focusState) {
            focusElement();
        }
    }, [focusState]);

    const handleFocus = () => {
        console.log(id, " focused");
    };

    const focusElement = () => {
        liRef.current?.focus();
    };

    return (
        <li id={id} role="button" tabIndex={0} ref={liRef} onFocus={handleFocus} onMouseEnter={() => focusElement()}>
            List item {index}
        </li>
    );
};

const buildListItems = (listItems: string[], focusState: number) => {
    return listItems.map((e: string, index: number) => {
        return <ListItem id={e} key={e} index={index} focusState={focusState} />;
    });
};

function App() {
    const ulRef = React.useRef<HTMLUListElement | null>(null);

    const [focusedState, setFocusedState] = React.useState(-1);
    const [currTargetState, setCurrTarget] = React.useState("");

    const items = buildListItems(listItems, focusedState);

    const newItems = (items: JSX.Element[]) => {
        return items.map((element: JSX.Element) => {
            return <ListItem key={element.props.id} {...element.props} optional={3} />;
        });
    };

    const processedItems = newItems(items);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
        if (e.key === "ArrowDown") {
            if (focusedState < items.length) {
                setFocusedState(focusedState + 1);
            }
        } else if (e.key === "ArrowUp") {
            if (focusedState > 0) {
                setFocusedState(focusedState - 1);
            }
        }
    };

    const handleMouseMove = React.useCallback((event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const targetId = (event.target as any).id;
        console.log(currTargetState, targetId);
        setCurrTarget(targetId);

        if (targetId != currTargetState) {
            console.log("findIndex runs");
            const indexOfElement = items.findIndex((e) => e.props.id === targetId);
            setFocusedState(indexOfElement);
        }
    }, []);

    return (
        <>
            <ul ref={ulRef} onKeyDown={handleKeyDown} role="listbox" tabIndex={0} onMouseMove={handleMouseMove}>
                {processedItems}
            </ul>
        </>
    );
}

export default App;
