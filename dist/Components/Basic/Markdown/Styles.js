import { StyleSheet, } from 'react-native';
export const Styles = StyleSheet.create({
    h1: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    h2: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    h3: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    h4: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    h5: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    h6: {
        fontWeight: 'bold',
        fontSize: 11,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    bolditalic: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    delete: {
        textDecorationLine: 'line-through',
    },
    list: {
        marginTop: 8,
    },
    listItem: {
        flexDirection: 'row',
    },
    listItemBullet: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    listItemNumber: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    link: {
        color: 'blue',
    },
});
