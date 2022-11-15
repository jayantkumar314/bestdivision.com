import React from "react";

// export default function App() {
//     const [name, setName] = React.useState("bell");
//     return (
//         <div className="App">
//             <button
//                 onClick={() =>
//                     setName(prevName => (prevName === "bell" ? "plus" : "messenger"))
//                 }
//             >
//                 Change Icon
//       </button>
//             <Icon name={name} fill="gray" />
//         </div>
//     );
// }

const Icon = ({ name, ...rest }) => {
    const ImportedIconRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        async function importIcon(){
            try {
                ImportedIconRef.current = (await import(`../../icons/${name}.svg`)).ReactComponent;
            } catch (err) {
                // Your own error handling logic, throwing error for the sake of
                // simplicity
                throw err;
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name]);

    if (!loading && ImportedIconRef.current) {
        const { current: ImportedIcon } = ImportedIconRef;
        return <ImportedIcon {...rest} />;
    }

    return null;
};