export function safe(Component) {
    return class SafeComponent extends Component {
        constructor(props) {
            super(props);
            this.mounted = false;
        }
        componentDidMount() {
            this.mounted = true;
            super.componentDidMount();
        }
        componentWillUnmount() {
            super.componentWillUnmount();
            this.mounted = false;
        }
        setState(state, callback) {
            if (this.mounted) {
                super.setState(state, callback);
            }
        }
    };
}
