project(QuickCrypto)
cmake_minimum_required(VERSION 3.9.0)

set(PACKAGE_NAME QuickCrypto)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)

# Define C++ library and add all sources
add_library(
  ${PACKAGE_NAME} SHARED
  src/main/cpp/cpp-adapter.cpp
  ../cpp/hmac/HybridHmac.cpp
  ../cpp/hash/HybridHash.cpp
  ../cpp/ed25519/HybridEdKeyPair.cpp
  ../cpp/pbkdf2/HybridPbkdf2.cpp
  ../cpp/random/HybridRandom.cpp
  ../deps/fastpbkdf2/fastpbkdf2.c
)

# add Nitrogen specs
include(${CMAKE_SOURCE_DIR}/../nitrogen/generated/android/QuickCrypto+autolinking.cmake)

# local includes
include_directories(
  "src/main/cpp"
  "../cpp/hmac"
  "../cpp/hash"
  "../cpp/ed25519"
  "../cpp/pbkdf2"
  "../cpp/random"
  "../cpp/utils"
  "../deps/fastpbkdf2"
)

# Third party libraries (Prefabs)
find_library(LOG_LIB log)

find_package(openssl REQUIRED CONFIG)

# Link all libraries together
target_link_libraries(
  ${PACKAGE_NAME}
  ${LOG_LIB}                             # <-- Logcat logger
  android                                # <-- Android core
  openssl::crypto                        # <-- OpenSSL (Crypto)
  )

if(ReactAndroid_VERSION_MINOR GREATER_EQUAL 76)
  target_link_libraries(
    ${PACKAGE_NAME}
    ReactAndroid::reactnative             # <-- RN: Native Modules umbrella prefab
  )
else()
  target_link_libraries(
    ${PACKAGE_NAME}
    ReactAndroid::turbomodulejsijni
    ReactAndroid::react_nativemodule_core  # <-- RN: React Native native module core
  )
endif()
