import { Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const ImageCompany = ({ src, width, height }) => {
    const defaultImage = '../assets/image/common/404.jpg'

    const [img, setImg] = useState(
      require(defaultImage),
    )

    useEffect(() => {
      if(src){
        setImg({uri: `https://image.tmdb.org/t/p/original${src}`})
      }
    }, [src])
    
    return (
      <Image
        source={img}
        style={{
          width: width || 80,
          height: height || 80,
          resizeMode: 'contain',
          backgroundColor: '#F8F8F8',
          marginRight: 4,
        }}
        onError={() => setImg(defaultImage)}
        defaultSource={require(defaultImage)}
      />
    )
  }

export default ImageCompany
