<script setup>
defineProps({
  rtmpStat: Object,
  isAppAsArray:Boolean
});
</script>
<template>
  <v-card>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Bandwidth In</th>
          <th class="text-left">Bandwidth Out</th>
          <th class="text-left">Bytes In</th>
          <th class="text-left">Bytes Out</th>
          <th class="text-left">Uptime</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ rtmpStat?.bw_in._text }}</td>
          <td>{{ rtmpStat?.bw_out._text }}</td>
          <td>{{ rtmpStat?.bytes_in._text }}</td>
          <td>{{ rtmpStat?.bytes_out._text }}</td>
          <td>{{ rtmpStat?.uptime._text }}</td>
        </tr>
        <tr>
          <th colspan="5">Server Application</th>
        </tr>
        <tr>
          <td colspan="5">
            <v-card class="m-4">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Stream Key</th>
                    <th class="text-left">Time</th>
                    <th class="text-left">Bandwidth In</th>
                    <th class="text-left">Bandwidth Out</th>
                    <th class="text-left">Bytes In</th>
                    <th class="text-left">Bytes Out</th>
                    <th class="text-left">Bandwidth Video</th>
                    <th class="text-left">Bandwidth Audio</th>
                  </tr>
                </thead>
                <tbody v-if="!isAppAsArray">
                  <tr >
                    <td>
                      {{ rtmpStat?.server.application.live.stream.name._text }}
                    </td>
                    <td>
                      {{ rtmpStat?.server.application.live.stream.time._text }}
                    </td>
                    <td>
                      {{ rtmpStat?.server.application.live.stream.bw_in._text }}
                    </td>
                    <td>
                      {{
                        rtmpStat?.server.application.live.stream.bw_out._text
                      }}
                    </td>
                    <td>
                      {{
                        rtmpStat?.server.application.live.stream.bytes_in._text
                      }}
                    </td>
                    <td>
                      {{
                        rtmpStat?.server.application.live.stream.bytes_out._text
                      }}
                    </td>
                    <td>
                      {{
                        rtmpStat?.server.application.live.stream.bw_video._text
                      }}
                    </td>
                    <td>
                      {{
                        rtmpStat?.server.application.live.stream.bw_audio._text
                      }}
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </td>
        </tr>
        <tr>
          <th colspan="5">Client Info</th>
        </tr>
        <tr>
          <td colspan="5">
            <v-card class="m-4">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Id</th>
                    <th class="text-left">Address</th>
                    <th class="text-left">Time</th>
                    <th class="text-left">Flashver</th>
                    <th class="text-left">Swf URL</th>
                    <th class="text-left">Dropped</th>
                    <th class="text-left">Avsync</th>
                    <th class="text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody v-if="!isAppAsArray">
                  <tr>
                    <td>
                      {{ rtmpStat?.server.application.live.stream.client.id._text }}
                    </td>
                    <td>
                      {{ rtmpStat?.server.application.live.stream.client.address._text }}
                    </td>
                    <td>
                      {{ rtmpStat?.server.application.live.stream.client.time._text }}
                    </td>
                    <td>
                        {{ rtmpStat?.server.application.live.stream.client.flashver._text }}
                    </td>
                    <td>
                        {{ rtmpStat?.server.application.live.stream.client.swfurl._text }}
                    </td>
                    <td>
                        {{ rtmpStat?.server.application.live.stream.client.dropped._text }}
                    </td>

                    <td>
                        {{ rtmpStat?.server.application.live.stream.client.avsync._text }}
                    </td>
                    <td>
                        {{ rtmpStat?.server.application.live.stream.client.timestamp._text }}
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="isAppAsArray">
                    <tr v-for="application in rtmpStat?.server.application" :key="application.live.stream.client.id">
                    <td>
                      {{ application.live.stream.client.id._text }}
                    </td>
                    <td>
                      {{ application.live.stream.client.address._text }}
                    </td>
                    <td>
                      {{ application.live.stream.client.time._text }}
                    </td>
                    <td>
                        {{ application.live.stream.client.flashver._text }}
                    </td>
                    <td>
                        {{ application.live.stream.client.swfurl._text }}
                    </td>
                    <td>
                        {{ application.live.stream.client.dropped._text }}
                    </td>

                    <td>
                        {{ application.live.stream.client.avsync._text }}
                    </td>
                    <td>
                        {{ application.live.stream.client.timestamp._text }}
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
