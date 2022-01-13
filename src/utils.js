const ALL_ADVANCEMENTS = [
  "minecraft:husbandry/balanced_diet",
  "minecraft:adventure/kill_all_mobs",
  "minecraft:adventure/adventuring_time",
  "minecraft:husbandry/bred_all_animals",
  "minecraft:husbandry/complete_catalogue",
  "minecraft:nether/explore_nether"
]

const IMAGE_PATHS = {
  BIOMES: process.env.PUBLIC_URL + '/images/biomes.png',
  ENTITIES: process.env.PUBLIC_URL + '/images/entities.png',
  ITEMS: process.env.PUBLIC_URL + '/images/items.png',
  INV: process.env.PUBLIC_URL + '/images/inv.png',
  FRAME: process.env.PUBLIC_URL + '/images/trophy.png',
}

class Advancement {
  constructor(name, imagePosition, albumPath, jsonPath) {
    this.name = name
    this.imagePosition = imagePosition
    this.albumPath = albumPath
    this.jsonPath = jsonPath
  }
}

const ADVANCEMENTS_NAMES = {
  "minecraft:husbandry/balanced_diet": new Advancement(
    "A balanced diet", '-768px -3168px', IMAGE_PATHS.ITEMS, '/jsons/balanced.json'),
  "minecraft:adventure/kill_all_mobs": new Advancement(
    'Monsters Hunted', '-576px -3616px', IMAGE_PATHS.ENTITIES, '/jsons/hunted.json'),
  "minecraft:adventure/adventuring_time": new Advancement(
    'Adventuring Time', '-96px -2496px', IMAGE_PATHS.BIOMES, '/jsons/adventuring.json'),
  "minecraft:husbandry/bred_all_animals": new Advancement(
    'Two By Two', '-160px -3136px', IMAGE_PATHS.ENTITIES, '/jsons/twoby.json'),
  "minecraft:husbandry/complete_catalogue": new Advancement(
    'A complete Catalogue', '-896px -1664px', IMAGE_PATHS.ENTITIES, '/jsons/complete.json'),
  "minecraft:nether/explore_nether": new Advancement(
    'Hot Tourist Destination', '-416px -128px', IMAGE_PATHS.BIOMES, '/jsons/hot.json'),
}

export { ADVANCEMENTS_NAMES, ALL_ADVANCEMENTS, IMAGE_PATHS }