import React from 'react'
// import Icon from './Icon'

import { ReactComponent as Logo } from '../../icons/bell.svg';
// import { ReactComponent as TutorialsIcon } from '../../icons/messenger.svg';
// import { ReactComponent as TemplatesIcon } from '../../icons/caret.svg';
// import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
var Home =  class App extends React.Component {
    render() {
        return (
            this.props.icon
        )
    }
}
var Component = Home;
function LeftnavItem({icon, iconSvg, listName}) {
    const [name, setName] = React.useState("bell");
    const IconSvg = iconSvg;
    return (
        <li className="css-scope list_item">
            <a className="css-scope waves-effect" href="#">
                {/* <img width="18" height="18" src={`data:image/svg+xml;utf8,${icon}`}/>{name} */}
                {/* {/* <Logo /> */}
                <Icon name="bell" fill="red" width="300" height="100"/>
                <Home icon='<svg viewBox="0 0 448 512"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" className=""></path></svg>
' />
                {listName} 
                {/* <Icon/>  */}
                {/* <Icon name={name} fill="gray" /> */}
                {/* <Icon name="svg1" fill="gray" width="300" /> */}
                {/* <Icon name="svg2" fill="darkblue" height="100" /> */}
            </a>
        </li>
    )
}

const Icon = ({ name, ...rest }) => {
    const ImportedIconRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        const importIcon = async () => {
            try {
                // ImportedIconRef.current = import(`../../icons/${name}.svg`).ReactComponent;
                // ImportedIconRef.current = (await import(`../../icons/bell.svg`)).default;
                ImportedIconRef.current = (await import(`../../icons/bell.svg`)).ReactComponent;
                // debugger;
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
    
    // if (!loading && ImportedIconRef.current) {
        if (!loading && ImportedIconRef.current) {
            const { current: ImportedIcon } = ImportedIconRef;
            return <ImportedIcon {...rest} />;
        }

    return null;
};

export default LeftnavItem

