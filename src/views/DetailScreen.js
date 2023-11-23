import React from 'react'
import {
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native'
import {Appbar, Card, Text} from 'react-native-paper'
import RenderHtml from 'react-native-render-html'
import ImageCompany from '../components/ImageCompany'

const TextInfo = ({label, description, html}) => {
  const {width} = useWindowDimensions()
  return (
    <View style={{marginBottom: 16}}>
      <Text style={{fontWeight: 'bold', color: '#a1a1a1'}}>{label}</Text>
      {html ? (
        <RenderHtml
          source={{
            html: description,
          }}
          contentWidth={width}
        />
      ) : (
        <Text>{description}</Text>
      )}
    </View>
  )
}

const DetailScreen = ({navigation, route}) => {
  const {item} = route.params

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: '#0000'}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Movie Detail' style={{alignItems: 'center'}} />
        <Appbar.Action />
      </Appbar.Header>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 8,
        }}>
        <View style={{flexDirection: 'row', paddingVertical: 16}}>
          <View style={{flex: 1}}>
            <ImageCompany src={item?.backdrop_path} width={'100%'} height={250} />
          </View>
        </View>
        <Card>
          <Card.Content>
            <TextInfo
              label={'Title'}
              description={item?.original_title}
            />
            <TextInfo
              label={'Date Release'}
              description={item?.release_date}
            />
            <TextInfo
              label={'Description'}
              description={item?.overview}
            />
            <TextInfo
              label={'Popularity'}
              description={item?.popularity}
            />
            <TextInfo
              label={'Rating'}
              description={item?.vote_average}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  )
}

export default DetailScreen
