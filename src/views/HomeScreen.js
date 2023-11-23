import React, {useEffect, useRef, useState} from 'react'
import {FlatList, RefreshControl, View} from 'react-native'
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  IconButton,
  Searchbar,
  Text,
} from 'react-native-paper'
import {BASE_URL, requestGet} from '../utils/requestUtlis'
import lodash from 'lodash'
import ImageCompany from '../components/ImageCompany'

const HomeScreen = ({navigation}) => {
  const ref = useRef({
    page: 1,
    disableLoadMore: false,
  })

  const [loadMore, setLoadMore] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [filter, showFilter] = useState(false)
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')

  const setInput = setter => val => {
    setter(val)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async refresh => {
    try {
      const params = {
        page: ref.current.page,
        query,
      }
      setLoadMore(true)

      let result = []
      const response = await requestGet(`${BASE_URL}/${query?'search/movie':'movie/now_playing'}`, params)
      if (!data || !!refresh) {
        setErrorMessage('')
        result = response
      } else {
        result = lodash.unionBy(data, response.results, 'id')
      }
      setData(result)
      setLoadMore(false)
    } catch (error) {
      setLoadMore(false)
      setErrorMessage(error.error)
    }
  }

  const getMore = () => {
    if (!loadMore && !errorMessage) {
      ref.current.page++
      setLoadMore(true)
      fetchData()
    }
  }

  clearSearch = () => {
    setInput(setQuery)('')
  }

  const renderItem = ({item}) => {
    if (!item?.title) {
      return <View />
    }

    return (
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <Card onPress={() => navigation.navigate('Detail', {item})}>
          <View style={{flexDirection: 'row', paddingVertical: 16}}>
            <View>
              <ImageCompany src={item?.poster_path} />
            </View>
            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold'}}>{item?.title}</Text>
              <Text style={{color: '#a1a1a1'}}>{item?.release_date}</Text>
              <Text style={{color: '#a1a1a1'}} numberOfLines={3}>{item?.overview}</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <IconButton
                icon='chevron-right'
                size={30}
                onPress={() => console.log('Pressed')}
              />
            </View>
          </View>
        </Card>
      </View>
    )
  }

  const renderEmpty = () => (
    <Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 8}}>
      Tidak ada Data Ditemukan!
    </Text>
  )

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: '#0000'}}>
        {/* <Appbar.Action /> */}
        <Appbar.Content title='Movie List' style={{alignItems: 'center'}} />
        {/* <Appbar.Action icon='magnify' onPress={() => showFilter(!filter)} /> */}
      </Appbar.Header>
      {!!filter && (
        <Card style={{borderRadius: 0}}>
          <Card.Content>
            <Searchbar
              placeholder='Search'
              onChangeText={setInput(setQuery)}
              value={query}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
              <Button
                mode='contained'
                onPress={() => {
                  ref.current.page = 1
                  fetchData(true)
                }}>
                Filter
              </Button>
              <Button
                mode='contained'
                buttonColor='#f44336'
                onPress={() => {
                  clearSearch()
                }}>
                Clear
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.filter(val => !!val) || []}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        onEndReached={() => {
            getMore()
        }}
        onEndReachedThreshold={0.01}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              ref.current.page = 1
              fetchData(true)
            }}
          />
        }
        ListFooterComponent={
          !!data.length ? (
            <View>
              {loadMore ? (
                <View style={{marginTop: 16}}>
                  <ActivityIndicator size='large' />
                </View>
              ) : null}
            </View>
          ) : (
            <ActivityIndicator size='large' />
          )
        }
      />
    </View>
  )
}

export default HomeScreen
