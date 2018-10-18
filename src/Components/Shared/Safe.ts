import * as React from 'react';

export function safe<P, S>(Component: React.ComponentClass<P, S>): any {
    return class SafeComponent extends Component {
        public mounted: boolean;

        constructor(props: P) {
            super(props);

            this.mounted = false;
        }

        public componentDidMount() {
            this.mounted = true;
            super.componentDidMount();
            console.log('SafeComponent >> Mounted.');
        }

        public componentWillUnmount() {
            super.componentWillUnmount();
            this.mounted = false;
            console.log('SafeComponent >> Unmounted.');
        }

        // tslint:disable-next-line:max-line-length
        public setState<K extends keyof S>(state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null), callback?: () => void) {
            console.log('SafeComponent >> Try Set State');
            if (this.mounted) {
                console.log('SafeComponent >> Set State >> Mounted.');
                super.setState(state, callback);
            } else {
                console.log('SafeComponent >> Set State >> Unmounted.');
            }
        }
    };
}
