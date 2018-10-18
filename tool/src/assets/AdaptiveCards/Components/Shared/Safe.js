export function safe(Component) {
    return class SafeComponent extends Component {
        constructor(props) {
            super(props);
            this.mounted = false;
        }
        componentDidMount() {
            this.mounted = true;
            super.componentDidMount();
            console.log('SafeComponent >> Mounted.');
        }
        componentWillUnmount() {
            super.componentWillUnmount();
            this.mounted = false;
            console.log('SafeComponent >> Unmounted.');
        }
        setState(state, callback) {
            console.log('SafeComponent >> Try Set State');
            if (this.mounted) {
                console.log('SafeComponent >> Set State >> Mounted.');
                super.setState(state, callback);
            }
            else {
                console.log('SafeComponent >> Set State >> Unmounted.');
            }
        }
    };
}
