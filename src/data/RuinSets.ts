import RuinSet from "../model/RuinSet";

function getNullableInt(key: string): number | null {
  if (settings.global[key].value == null) return null;
  return parseInt(<string>settings.global[key].value);
}

export default [
  new RuinSet(
    "common",
    // "0eNqllUFugzAQRe8yayMBhQF8lSqKHDJtrRIbgRs1ibh7DFGVLJqq4i89nvdX8/QvtOu+pB+sC9ud95+kL/fJSPr14Tn/2da723i078508yyceiFNNsiBFDlzmF8f5myGfRLX20GC0KTIur18k86mjaJgO7nl9H60wXo3J8XfslR0ikt1PT3LSjp5CzHwOdusZ5sUYDOAzQH2BWALgC0BlgG2Aljgrpr1d5Wna+6KARcYcIEBFxhwgQEXGHCBARcYcIEBFxhwgQEXGHCB/+tCbIilTvRD+yg6yjAuaXmdFVXRVFxlKZd875b0NzJZik2RaYM9yvZn9Y+86QrZZlFF",
    <string>settings.global['abandoned-ruins-common-book'].value,
    parseFloat(<string>settings.global['abandoned-ruins-common-chance'].value),
    getNullableInt('abandoned-ruins-common-min'),
    getNullableInt('abandoned-ruins-common-max'),
  ),
  new RuinSet(
    "uncommon",
    // "0eNql10FugzAQheG7zNpIDAEP5ipVFRHitlaJQeBGTSPuXiBqkkVTVX5LbP8jFv4WPtOu/bD94HzY7rrunarzbWWk6unuc9lzTecvy6N79XW7rIVTb6kiF+yBFPn6sHy91V/1sE/m481gg6VJkfN7+0kVT8+KgmvtZU7fjS64zi+T5t1SKzrNh8pyejQrae1LmAc+bk18a1KgZaDNgHYDtDnQFkCrgVaAFrhXJv5eZWnMvRLAggAWBLAggAUBLAhgQQALAlgQwIIAFgSwIIAFibdg0ngL19bEtwb45xgL1zYD2g3Q5kBbAK0GWgFa4F6Z+HsVZ4EBCwxYYMACAxYYsMCABQYsMGCBAQsMWGDAAgMW+L8W5pfD+syo7l4lio52GNdpWcm55Ea0cKoLfXtzpL+VyfrgUVQ3wR3t9ufoH/Omb2kqTng=",
    <string>settings.global['abandoned-ruins-uncommon-book'].value,
    parseFloat(<string>settings.global['abandoned-ruins-uncommon-chance'].value),
    getNullableInt('abandoned-ruins-uncommon-min'),
    getNullableInt('abandoned-ruins-uncommon-max'),
  ),
  new RuinSet(
    "rare",
    // "0eNql2MFugkAQgOF32TMmwI7MLq/SGIO6bTelYICaWsO7VzRVD61p/E+GhX/iYb7LHsyq/gjbLjbDctW2b6Y8XE96Uz7dPE7v4rptzsd9fGmqejob9ttgShOH8G4S01Tv09Nr9VV1m9nx83UXhmDGxMRmEz5NmY2LxAyxDuc527aPQ2ybadL0NvOJ2R9/nRv/Gjarw/NwnHgn9iD2KYkzEucktiQWEs9JXJBYSUw2zIMNy9NHNixPAYxL7EHsyd9+CMYlzklsSSwknpO4ILGSmGyYBxv2IAxLYFgCwxIYlsCwBIYlMCyBYQkMS2BYAsMSGJbAsASGEBhCYAiBIQSGEBhCYAiBIQSGEBhCYAiBIQSGEBhKYCiBoQSGEhhKYCiBoQSGEhhKYCiBoQSGEhhKYDgCwxEYjsBwBIYjMByB4QgMR2A4AsMRGI7AcASG+y+MRXK+zCpv7r4SswtdfxqXu0xUvBaapcW8uN5spb+Vs9O1WmKq9RB3Yfnz6Z154zfsS1js",
    <string>settings.global['abandoned-ruins-rare-book'].value,
    parseFloat(<string>settings.global['abandoned-ruins-rare-chance'].value),
    getNullableInt('abandoned-ruins-rare-min'),
    getNullableInt('abandoned-ruins-rare-max'),
  ),
  new RuinSet(
    "epic",
    // "0eNqtl8tugzAQRf9l1kZiiG0ev1JFESFua5UYBG7UNOLfC0QhWbRR5cvK8uPMYuTj8VxoX3+atrPO7/ZN80HF5b7SU/HyMJ32bNW463Jv31xZT2v+3BoqyHpzJEGuPE6z9/K77A7ReLzqjDc0CLLuYL6o4GEryNvaXOO0TW+9bdwUadpVsaDzOGbZ8FewqDavfoz4BM4BOI8RmBE4QeANAksEVgisEThFYOSG5cANS+KgG8aIGIyIwYgYjIjBiBiMiMGIGIyIwYgYjIjBiBiMiMGIGBIRQyJiqBXgMKsUYpVCrNJrwBsElggcpGS6BqwROMjnbA04yKp8DTgPh8NeEo18KzTyrdBIxdBIxdBIxdAJ4PMCSwQOStgGeD0XOEHgoIQhteoGB5WbBQ5KmPpvfR4bw7mLLB6aTkEn0/VzuCRjmco81SnHWul7Sxn/RkZzPyuorLw9md3t6JN4ww8Sg+Hv",
    <string>settings.global['abandoned-ruins-epic-book'].value,
    parseFloat(<string>settings.global['abandoned-ruins-epic-chance'].value),
    getNullableInt('abandoned-ruins-epic-min'),
    getNullableInt('abandoned-ruins-epic-max'),
  ),
  new RuinSet(
    "legendary",
    // "0eNqt1ttuwyAMANB/8TORQkrI5VemqqIp29BSiBJWravy7wupSvuwVZPNU8TlWMKC2BfY9596GI31u71zH9Be7jMTtC8Pw7BmOmev05N5s6oPc/48aGjBeH0EBlYdw+hdfavxkC3bu1F7DTMDYw/6C1o+bxl40+trnMFNxhtnQ6SwWgoG5+Vb1/NfwbJev/ol4hPcYHCZADc5BXMKLjBYpsAbChYUXGJwlQJLCq4wuE6BUa+qSYEbPC5yzKuSOSFhEWPOLDnhhkUsKRh15oLwniMWFIxK2Ibw94y4oGBUwii16oZR5SZiVMLK/9bnpcyvPUH70EIwOOlxWsMVNReVaCpZ8VyW8t4g5L/JbO1OGKjOm5Pe3bY+iTf/ACIh4JI=",
    <string>settings.global['abandoned-ruins-legendary-book'].value,
    parseFloat(<string>settings.global['abandoned-ruins-legendary-chance'].value),
    getNullableInt('abandoned-ruins-legendary-min'),
    getNullableInt('abandoned-ruins-legendary-max'),
  )
]