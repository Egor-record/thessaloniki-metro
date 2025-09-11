<template>
    <div class="svg-wrapper">
      <SvgMap @station-selected="handleStationSelected" :selectedId="selectedStations" ref="map"></SvgMap>
    </div>
  </template>
<script>
import { STATIONS_GRAPH, STATIONS } from '../../utils/globalConst.js'
import SvgMap from './SvgMap.vue'
export default {
  name: 'Map',
  components: {
    SvgMap
  },
  props: {
    lang: {
      type: String,
      required: true,
      default: 'el',
    }
  },
  data () {
    return {
      selectedStationId: '',
      selectedStations: [],
      estimatedTime: 0
    }
  },
  mounted() {
    window.addEventListener("routechange", () => {this.parseRouteURL(); this.scrollToMap()})
    this.parseRouteURL()
  },
  methods: {
    handleStationSelected(id) {
      this.selectedStationId = id
    },
    parseRouteURL() {
      const params = new URLSearchParams(window.location.search)
      const from = this.getStationIdByName(params.get("from"))
      const to = this.getStationIdByName(params.get("to"))
      if (from === null || to === null) return
      const departureDateTime = params.get("departureDateTime")
      const arrival = params.get("arrival") === "true"

      const result = this.buildRoute(STATIONS_GRAPH, from, to)
      this.selectedStations = result.path
      this.estimatedTime = result.time
    },
    getStationIdByName(name) {
      if (!name) return null
      const station = STATIONS.find(
        s => s.name?.[this.lang]?.toLowerCase() === name?.toLowerCase()
      )
      return station ? station.id : null
    },
    buildRoute(stations, start, end) {
      const times = {}
      const backtrace = {}
      const pq = []
      for (const node in stations) {
        times[node] = Infinity
      }
      times[start] = 0
      pq.push([start, 0])

      while (pq.length) {
        pq.sort((a, b) => a[1] - b[1])
        const [current, currentTime] = pq.shift()

        if (current === end) break

        for (const neighbor in stations[current]) {
          const newTime = currentTime + stations[current][neighbor]
          if (newTime < times[neighbor]) {
                times[neighbor] = newTime
                backtrace[neighbor] = current
                pq.push([neighbor, newTime])
          }
        }
      }
      const path = [end]
      let last = end
      while (last !== start) {
        last = backtrace[last]
        path.unshift(last)
      }

      return { path, time: times[end] }
    },
    scrollToMap () {
      if (this.$refs.map) {
        const top = this.$refs.map.offsetTop - (window.innerHeight / 2) + (this.$refs.map.offsetHeight / 2)
        window.scrollTo({
          top,
          behavior: "smooth"
        })
      }
    }
  }
}
</script>
<style>
.svg-wrapper {
  overflow-x: auto;              
  -webkit-overflow-scrolling: touch; 
  max-width: 100%;
  display: flex;                
  justify-content: center;
}

.svg-wrapper svg {
  display: block;
  min-width: 595px;
}
</style>