import {
    StyleSheet,
    TextStyle,
} from 'react-native';
  
export const Styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
    } as TextStyle,
    italic: {
        fontStyle: 'italic',
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
