export interface EnvValue {
  value: string
  replicate?: boolean
  templated?: boolean
}

export interface ServiceConfiguration {
  serviceName: string
  image?: string
  env?: Record<string, EnvValue>
}
