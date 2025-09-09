<template>
    <div>
      <p>{{ estimatedTime ? "Time estimated: " + estimatedTime + " min" : "" }} </p>
      <SvgMap @station-selected="handleStationSelected" :selectedId="selectedStations"></SvgMap>
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
  data () {
    return {
      selectedStationId: '',
      selectedStations: [],
      estimatedTime: 0
    }
  },
  mounted() {
    this.parseRouteURL()
  },
  methods: {
    handleStationSelected(id) {
      this.selectedStationId = id
      console.log("Parent received station id:", id)
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
    getStationIdByName(name, lang = 'el') {
      const station = STATIONS.find(s => s.name[lang] === name)
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
    }
  }
}
  </script>