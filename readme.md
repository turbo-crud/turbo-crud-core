# TurboCrud

Just write a yaml and run it

![alt text](image.png)

  mongo-express2:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
      ME_CONFIG_MONGODB_URL: mongodb://root:example@192.168.0.62:27019/
      ME_CONFIG_BASICAUTH: true