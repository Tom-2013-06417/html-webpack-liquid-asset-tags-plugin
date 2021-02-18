/* eslint-disable no-param-reassign */
/**
 * Updates HTMLWebpackPlugin assets src/href attributes to Shopify Liquid, piping
 * the filename to `asset_url`.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class AssetTagToShopifyLiquid {
  apply (compiler) {
    compiler.hooks.compilation.tap('Assets Tag Plugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'AssetTagToShopifyLiquid',
        (data, callback) => {
          data.headTags = data.headTags.map(this.fixTag);
          data.bodyTags = data.bodyTags.map(this.fixTag);

          callback(null, data);
        },
      );
    });
  }

  fixTag(tag) {
    if (tag.tagName === 'script') {
      tag.attributes.src = `{{ '${path.basename(
        tag.attributes.src,
      )}' | asset_url  }}`;
    }

    if (tag.tagName === 'link') {
      tag.attributes.href = `{{ '${path.basename(
        tag.attributes.href,
      )}' | asset_url  }}`;
    }

    return tag;
  }
};

module.exports = AssetTagToShopifyLiquid;
