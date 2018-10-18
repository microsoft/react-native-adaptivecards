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
        }

        public componentWillUnmount() {
            super.componentWillUnmount();
            this.mounted = false;
        }

        // tslint:disable-next-line:max-line-length
        public setState<K extends keyof S>(state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null), callback?: () => void) {
            if (this.mounted) {
                super.setState(state, callback);
            }
        }
    };
}
