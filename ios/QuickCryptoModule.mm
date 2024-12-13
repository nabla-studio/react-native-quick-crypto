#import "QuickCryptoModule.h"

#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <ReactCommon/RCTTurboModule.h>
#import <jsi/jsi.h>

#import "../cpp/MGLQuickCryptoHostObject.h"
#import "../cpp/JSIUtils/MGLTypedArray.h"

@implementation QuickCryptoModule

@synthesize bridge=_bridge;

RCT_EXPORT_MODULE(QuickCrypto)

- (void)setBridge:(RCTBridge *)bridge {
  _bridge = bridge;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install) {
  NSLog(@"Installing JSI bindings for react-native-quick-crypto...");
  RCTCxxBridge* cxxBridge = (RCTCxxBridge*)_bridge;
  if (cxxBridge == nil) {
    return @false;
  }

  using namespace facebook;

  auto jsiRuntime = (jsi::Runtime*)cxxBridge.runtime;
  if (jsiRuntime == nil) {
    return @false;
  }
  auto& runtime = *jsiRuntime;
  auto callInvoker = _bridge.jsCallInvoker;

  auto workerQueue =
      std::make_shared<margelo::DispatchQueue::dispatch_queue>("margelo crypto thread");
  auto hostObject = std::static_pointer_cast<jsi::HostObject>(
      std::make_shared<margelo::MGLQuickCryptoHostObject>(callInvoker, workerQueue));
  auto object = jsi::Object::createFromHostObject(runtime, hostObject);
  runtime.global().setProperty(runtime, "__QuickCryptoProxy", std::move(object));

  // Adds the PropNameIDCache object to the Runtime. If the Runtime gets
  // destroyed, the Object gets destroyed and the cache gets invalidated.
  auto propNameIdCache = std::make_shared<InvalidateCacheOnDestroy>(runtime);
  runtime.global().setProperty(
    runtime,
    "rnqcArrayBufferPropNameIdCache",
    jsi::Object::createFromHostObject(runtime, propNameIdCache)
  );

  NSLog(@"Successfully installed JSI bindings for react-native-quick-crypto!");
  return @true;
}

@end
