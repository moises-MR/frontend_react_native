import React,{ useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';


export default function ListAcordion() {

    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    return (
        <>
        <List.Section >
 

      <List.Accordion
      style={styles.listAccordion}
        title="TODAS"
        left={props => <List.Icon {...props}  />}
        expanded={expanded}
        onPress={handlePress}>
       
        
      </List.Accordion>
    </List.Section>
        </>
    )
}


const styles = StyleSheet.create({
  listAccordion:{
    backgroundColor:"rgba(0,0,0,0.5)",
    height: "auto"
  }
})
