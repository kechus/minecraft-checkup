const ALL_ADVANCEMENTS = [
  "minecraft:husbandry/balanced_diet",
  "minecraft:adventure/kill_all_mobs",
  "minecraft:adventure/adventuring_time",
  "minecraft:husbandry/bred_all_animals",
  "minecraft:husbandry/complete_catalogue",
  "minecraft:nether/explore_nether"
]


class Advancement {
  constructor(name, imagePosition) {
    this.name = name
    this.imagePosition = imagePosition
  }
}

const ADVANCEMENTS_NAMES = {
  "minecraft:husbandry/balanced_diet": new Advancement("A balanced diet", '-768px -3168px'),
  "minecraft:adventure/kill_all_mobs": new Advancement('Monsters Hunted', '-576px -3616px'),
  "minecraft:adventure/adventuring_time": new Advancement('Adventuring Time', '-96px -2496px'),
  "minecraft:husbandry/bred_all_animals": new Advancement('Two By Two', '-160px -3136px'),
  "minecraft:husbandry/complete_catalogue": new Advancement('A complete Catalogue', '-96px -2496px'),
  "minecraft:nether/explore_nether": new Advancement('Hot Tourist Destination', '-416px -128px'),
}


const IMGUR_ALBUM = 'https://imgur.com/a/hUYxGbF'
const IMAGE_PATHS = {
  BIOMES: 'https://i.imgur.com/LfkbfIL.png',
  ENTITIES: 'https://i.imgur.com/x6pz3ea.png',
  ITEMS: 'https://i.imgur.com/qmQxT12.png',
  INV: 'https://i.imgur.com/WldiMUV.png',
  FRAME: 'https://i.imgur.com/KtUu4uK.png',
}

export { ADVANCEMENTS_NAMES, ALL_ADVANCEMENTS, IMAGE_PATHS }