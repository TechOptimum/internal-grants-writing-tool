import { api } from '~/utils/api'

export const {refetch: refetchGrants} = api.grants.getGrants.useQuery()
