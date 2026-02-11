import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HelpdeskController::index
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/helpdesk/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HelpdeskController::index
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::index
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HelpdeskController::index
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::index
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::index
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HelpdeskController::index
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
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
* @see \App\Http\Controllers\HelpdeskController::create
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/helpdesk/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HelpdeskController::create
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::create
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HelpdeskController::create
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::create
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::create
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HelpdeskController::create
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
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
* @see \App\Http\Controllers\HelpdeskController::store
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/helpdesk/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HelpdeskController::store
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::store
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::store
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::store
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HelpdeskController::show
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
export const show = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/helpdesk/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HelpdeskController::show
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
show.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return show.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::show
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
show.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HelpdeskController::show
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
show.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::show
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
    const showForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::show
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
        showForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HelpdeskController::show
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
        showForm.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\HelpdeskController::addComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
export const addComment = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addComment.url(args, options),
    method: 'post',
})

addComment.definition = {
    methods: ["post"],
    url: '/helpdesk/tickets/{ticket}/comment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HelpdeskController::addComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
addComment.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return addComment.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::addComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
addComment.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addComment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::addComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
    const addCommentForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addComment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::addComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
        addCommentForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addComment.url(args, options),
            method: 'post',
        })
    
    addComment.form = addCommentForm
const HelpdeskController = { index, create, store, show, addComment }

export default HelpdeskController