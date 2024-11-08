///
/// HybridRandomSpec.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#if __has_include(<NitroModules/HybridObject.hpp>)
#include <NitroModules/HybridObject.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif

// Forward declaration of `ArrayBuffer` to properly resolve imports.
namespace NitroModules { class ArrayBuffer; }

#include <future>
#include <NitroModules/ArrayBuffer.hpp>

namespace margelo::nitro::crypto {

  using namespace margelo::nitro;

  /**
   * An abstract base class for `Random`
   * Inherit this class to create instances of `HybridRandomSpec` in C++.
   * You must explicitly call `HybridObject`'s constructor yourself, because it is virtual.
   * @example
   * ```cpp
   * class HybridRandom: public HybridRandomSpec {
   * public:
   *   HybridRandom(...): HybridObject(TAG) { ... }
   *   // ...
   * };
   * ```
   */
  class HybridRandomSpec: public virtual HybridObject {
    public:
      // Constructor
      explicit HybridRandomSpec(): HybridObject(TAG) { }

      // Destructor
      virtual ~HybridRandomSpec() { }

    public:
      // Properties
      

    public:
      // Methods
      virtual std::future<std::shared_ptr<ArrayBuffer>> randomFill(const std::shared_ptr<ArrayBuffer>& buffer, double offset, double size) = 0;
      virtual std::shared_ptr<ArrayBuffer> randomFillSync(const std::shared_ptr<ArrayBuffer>& buffer, double offset, double size) = 0;

    protected:
      // Hybrid Setup
      void loadHybridMethods() override;

    protected:
      // Tag for logging
      static constexpr auto TAG = "Random";
  };

} // namespace margelo::nitro::crypto
