import {createClient} from '@sanity/client'


export const client = createClient({
  projectId: 'yd08m03a',
  dataset: 'production',
  apiVersion: '2022-04-22', // use current date (YYYY-MM-DD) to target the latest API version
  token:"skCme4F0xDYvawifhF9aeQDMc1Y5gPZ5QpAKJcH4PNkVEjeegxnGkprJcrU3aCFcDwITGVPmEmFXaQPcHolvigpoqLM33cahf5M6T127Oy2qAjdGsfL0F26iLzcO1N8epRc0zlhY22reik41eJ2LaIhGPjZDm9QZw2DxQ3cGEtSEBm2gqTpl"
})