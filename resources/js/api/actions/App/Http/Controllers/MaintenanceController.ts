import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MaintenanceController::index
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/maintenances',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceController::index
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::index
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceController::index
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::index
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::index
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceController::index
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\MaintenanceController::create
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/maintenances/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceController::create
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::create
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceController::create
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::create
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::create
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceController::create
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\MaintenanceController::store
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/maintenances',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MaintenanceController::store
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::store
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::store
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::store
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MaintenanceController::edit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
export const edit = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/maintenances/{maintenance}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceController::edit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
edit.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { maintenance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: typeof args.maintenance === 'object'
                ? args.maintenance.id
                : args.maintenance,
                }

    return edit.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::edit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
edit.get = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceController::edit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
edit.head = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::edit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
    const editForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::edit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
        editForm.get = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceController::edit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
        editForm.head = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\MaintenanceController::update
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
export const update = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/maintenances/{maintenance}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MaintenanceController::update
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
update.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { maintenance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: typeof args.maintenance === 'object'
                ? args.maintenance.id
                : args.maintenance,
                }

    return update.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::update
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
update.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::update
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
    const updateForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::update
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
        updateForm.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\MaintenanceController::destroy
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
export const destroy = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/maintenances/{maintenance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MaintenanceController::destroy
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
destroy.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { maintenance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: typeof args.maintenance === 'object'
                ? args.maintenance.id
                : args.maintenance,
                }

    return destroy.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::destroy
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
destroy.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::destroy
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
    const destroyForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::destroy
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
        destroyForm.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const MaintenanceController = { index, create, store, edit, update, destroy }

export default MaintenanceController