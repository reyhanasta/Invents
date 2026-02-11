import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TicketController::index
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::index
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::index
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicketController::index
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TicketController::index
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TicketController::index
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TicketController::index
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
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
* @see \App\Http\Controllers\TicketController::create
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::create
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::create
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicketController::create
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TicketController::create
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TicketController::create
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TicketController::create
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
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
* @see \App\Http\Controllers\TicketController::store
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketController::store
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::store
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TicketController::store
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::store
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TicketController::show
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
export const show = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::show
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
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
* @see \App\Http\Controllers\TicketController::show
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
show.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicketController::show
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
show.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TicketController::show
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
    const showForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TicketController::show
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
        showForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TicketController::show
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
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
* @see \App\Http\Controllers\TicketController::edit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
export const edit = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tickets/{ticket}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::edit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
edit.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::edit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
edit.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicketController::edit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
edit.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TicketController::edit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
    const editForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TicketController::edit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
        editForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TicketController::edit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
        editForm.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TicketController::update
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
export const update = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/tickets/{ticket}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TicketController::update
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
update.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::update
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
update.put = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\TicketController::update
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
    const updateForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::update
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
        updateForm.put = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TicketController::destroy
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
export const destroy = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tickets/{ticket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TicketController::destroy
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
destroy.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::destroy
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
destroy.delete = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TicketController::destroy
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
    const destroyForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::destroy
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
        destroyForm.delete = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\TicketController::assign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
export const assign = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketController::assign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
assign.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return assign.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::assign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
assign.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TicketController::assign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
    const assignForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::assign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
        assignForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(args, options),
            method: 'post',
        })
    
    assign.form = assignForm
/**
* @see \App\Http\Controllers\TicketController::changeStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
export const changeStatus = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: changeStatus.url(args, options),
    method: 'post',
})

changeStatus.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketController::changeStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
changeStatus.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return changeStatus.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::changeStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
changeStatus.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: changeStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TicketController::changeStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
    const changeStatusForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: changeStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::changeStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
        changeStatusForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: changeStatus.url(args, options),
            method: 'post',
        })
    
    changeStatus.form = changeStatusForm
/**
* @see \App\Http\Controllers\TicketController::addComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
export const addComment = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addComment.url(args, options),
    method: 'post',
})

addComment.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/comment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketController::addComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
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
* @see \App\Http\Controllers\TicketController::addComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
addComment.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addComment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TicketController::addComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
    const addCommentForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addComment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::addComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
        addCommentForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addComment.url(args, options),
            method: 'post',
        })
    
    addComment.form = addCommentForm
const TicketController = { index, create, store, show, edit, update, destroy, assign, changeStatus, addComment }

export default TicketController