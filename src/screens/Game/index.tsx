import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons"
import { GameParams } from "../../@types/navigation";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch"

import { styles } from "./styles";
import { THEME } from "../../theme";
import ImgLogo from "../../assets/logo-nlw-esports.png"

export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [duoSelected, setDuoSelected] = useState('')

  const navigation = useNavigation()
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack()
  }

  function getDiscord(adId: string) {
    
    fetch(`http://192.168.96.1:3333/ads/${adId}/discord`)
    .then((Response) => Response.json())
    .then((data) => setDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.96.1:3333/games/${game.id}/ads`)
      .then((Response) => Response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />  
          </TouchableOpacity>
          <Image 
            source={ImgLogo}
            style={styles.logo}
          />
          <View style={styles.rigth}/>
        </View>

        <Image 
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard 
              data={item}
              onConnect={() => getDiscord(item.id)}
            />
          )}
          horizontal={true}
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              N??o h?? an??ncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch 
          visible={duoSelected.length > 0}
          discord={duoSelected}
          onClose={() => setDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
