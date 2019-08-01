import {
    StyleSheet,
    TextStyle,
} from 'react-native';
  
export const Styles = StyleSheet.create({
    h1: {
        fontWeight: 'bold',
        fontSize: 32,
    } as TextStyle,
    h2: {
        fontWeight: 'bold',
        fontSize: 24,
    } as TextStyle,
    h3: {
        fontWeight: 'bold',
        fontSize: 18,
    } as TextStyle,
    h4: {
        fontWeight: 'bold',
        fontSize: 16,
    } as TextStyle,
    h5: {
        fontWeight: 'bold',
        fontSize: 13,
    } as TextStyle,
    h6: {
        fontWeight: 'bold',
        fontSize: 11,
    } as TextStyle,
    bold: {
        fontWeight: 'bold',
    } as TextStyle,
    italic: {
        fontStyle: 'italic',
    } as TextStyle,
    bolditalic: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    } as TextStyle,
    delete: {
        textDecorationLine: 'line-through',
    } as TextStyle,
    list: {
        marginTop: 8,
    } as TextStyle,
    listItem: {
        flexDirection: 'row',
    } as TextStyle,
    listItemBullet: {
        paddingLeft: 16,
        paddingRight: 8,
    } as TextStyle,
    listItemNumber: {
        paddingLeft: 16,
        paddingRight: 8,
    } as TextStyle,
    link: {
        color: 'blue',
    } as TextStyle,  
});
