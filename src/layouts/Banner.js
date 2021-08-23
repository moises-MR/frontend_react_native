import React,{ useEffect , useState } from 'react';
import { 
View, 
Text, 
StyleSheet, 
Dimensions, 
Image, 
TouchableWithoutFeedback 
} from 'react-native';
import Carousel,{ Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../utils/constants"
const width = Dimensions.get("window").width


export default function Banner({imgBannerAndPromotions}) {

    const navigation = useNavigation();

  
    

    const [imageActive, setImageActive] = useState(0);

    const images = []

    imgBannerAndPromotions?.data[0]?.imageBanner.forEach(element => {
        
        images.push({url:`${API_URL}/${element.url}`})    
    });

    
  
       


        const renderItem = ({item}) =>{
     
            return(
                <TouchableWithoutFeedback 
                onPress={()=>{console.log("Me ineteresa")}}
                >
                <Image
                style={styles.carousel}
                source={{uri:item.url}}
                />
                </TouchableWithoutFeedback>
            )
        };



        const goToProduct = (id) =>{
            navigation.push("product",{idProducto:id})
        }




    return (
        <View style={styles.container}>
         <Carousel
           layout={"default"}
           data={images}
           sliderWidth={width}
           itemWidth={width}
           renderItem={renderItem}
         onSnapToItem={(index)=>{setImageActive(index)}}
           />
           <Pagination
            dotsLength={images.length}
            activeDotIndex={imageActive}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={styles.dotsContainer}
            inactiveDotColor="#FFF"
            dotColor="#FFF"
           />
        </View>
    )
};

const styles = StyleSheet.create({
    carousel:{
        width,
        height: 200,
    },
    container:{
        position: "relative"
    },
    dotsContainer:{
        position: "absolute",
        bottom: -20,
        width: "100%"

    },
    dotStyle:{
        backgroundColor:"#FFF"
    }
});
