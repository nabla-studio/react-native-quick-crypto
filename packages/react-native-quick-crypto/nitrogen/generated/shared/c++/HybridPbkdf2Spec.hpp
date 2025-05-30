///
/// HybridPbkdf2Spec.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

#if __has_include(<NitroModules/HybridObject.hpp>)
#include <NitroModules/HybridObject.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif

// Forward declaration of `ArrayBuffer` to properly resolve imports.
namespace NitroModules { class ArrayBuffer; }

#include <NitroModules/Promise.hpp>
#include <NitroModules/ArrayBuffer.hpp>
#include <string>

namespace margelo::nitro::crypto {

  using namespace margelo::nitro;

  /**
   * An abstract base class for `Pbkdf2`
   * Inherit this class to create instances of `HybridPbkdf2Spec` in C++.
   * You must explicitly call `HybridObject`'s constructor yourself, because it is virtual.
   * @example
   * ```cpp
   * class HybridPbkdf2: public HybridPbkdf2Spec {
   * public:
   *   HybridPbkdf2(...): HybridObject(TAG) { ... }
   *   // ...
   * };
   * ```
   */
  class HybridPbkdf2Spec: public virtual HybridObject {
    public:
      // Constructor
      explicit HybridPbkdf2Spec(): HybridObject(TAG) { }

      // Destructor
      virtual ~HybridPbkdf2Spec() { }

    public:
      // Properties
      

    public:
      // Methods
      virtual std::shared_ptr<Promise<std::shared_ptr<ArrayBuffer>>> pbkdf2(const std::shared_ptr<ArrayBuffer>& password, const std::shared_ptr<ArrayBuffer>& salt, double iterations, double keylen, const std::string& digest) = 0;
      virtual std::shared_ptr<ArrayBuffer> pbkdf2Sync(const std::shared_ptr<ArrayBuffer>& password, const std::shared_ptr<ArrayBuffer>& salt, double iterations, double keylen, const std::string& digest) = 0;

    protected:
      // Hybrid Setup
      void loadHybridMethods() override;

    protected:
      // Tag for logging
      static constexpr auto TAG = "Pbkdf2";
  };

} // namespace margelo::nitro::crypto
