import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
 * @see routes/web.php:8
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:8
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:8
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:8
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:8
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:8
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:8
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
 * @see routes/web.php:17
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:17
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:17
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:17
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:17
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:17
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:17
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\CategoryController::categories
 * @see app/Http/Controllers/CategoryController.php:12
 * @route '/categories'
 */
export const categories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})

categories.definition = {
    methods: ["get","head"],
    url: '/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CategoryController::categories
 * @see app/Http/Controllers/CategoryController.php:12
 * @route '/categories'
 */
categories.url = (options?: RouteQueryOptions) => {
    return categories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::categories
 * @see app/Http/Controllers/CategoryController.php:12
 * @route '/categories'
 */
categories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryController::categories
 * @see app/Http/Controllers/CategoryController.php:12
 * @route '/categories'
 */
categories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CategoryController::categories
 * @see app/Http/Controllers/CategoryController.php:12
 * @route '/categories'
 */
    const categoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CategoryController::categories
 * @see app/Http/Controllers/CategoryController.php:12
 * @route '/categories'
 */
        categoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CategoryController::categories
 * @see app/Http/Controllers/CategoryController.php:12
 * @route '/categories'
 */
        categoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    categories.form = categoriesForm
/**
* @see \App\Http\Controllers\CategoryController::categoriesStore
 * @see app/Http/Controllers/CategoryController.php:20
 * @route '/categories'
 */
export const categoriesStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: categoriesStore.url(options),
    method: 'post',
})

categoriesStore.definition = {
    methods: ["post"],
    url: '/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CategoryController::categoriesStore
 * @see app/Http/Controllers/CategoryController.php:20
 * @route '/categories'
 */
categoriesStore.url = (options?: RouteQueryOptions) => {
    return categoriesStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::categoriesStore
 * @see app/Http/Controllers/CategoryController.php:20
 * @route '/categories'
 */
categoriesStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: categoriesStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CategoryController::categoriesStore
 * @see app/Http/Controllers/CategoryController.php:20
 * @route '/categories'
 */
    const categoriesStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: categoriesStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CategoryController::categoriesStore
 * @see app/Http/Controllers/CategoryController.php:20
 * @route '/categories'
 */
        categoriesStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: categoriesStore.url(options),
            method: 'post',
        })
    
    categoriesStore.form = categoriesStoreForm
/**
* @see \App\Http\Controllers\CategoryController::categoriesUpdate
 * @see app/Http/Controllers/CategoryController.php:53
 * @route '/categories/{category}'
 */
export const categoriesUpdate = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: categoriesUpdate.url(args, options),
    method: 'put',
})

categoriesUpdate.definition = {
    methods: ["put"],
    url: '/categories/{category}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CategoryController::categoriesUpdate
 * @see app/Http/Controllers/CategoryController.php:53
 * @route '/categories/{category}'
 */
categoriesUpdate.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return categoriesUpdate.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::categoriesUpdate
 * @see app/Http/Controllers/CategoryController.php:53
 * @route '/categories/{category}'
 */
categoriesUpdate.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: categoriesUpdate.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\CategoryController::categoriesUpdate
 * @see app/Http/Controllers/CategoryController.php:53
 * @route '/categories/{category}'
 */
    const categoriesUpdateForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: categoriesUpdate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CategoryController::categoriesUpdate
 * @see app/Http/Controllers/CategoryController.php:53
 * @route '/categories/{category}'
 */
        categoriesUpdateForm.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: categoriesUpdate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    categoriesUpdate.form = categoriesUpdateForm
/**
* @see \App\Http\Controllers\CategoryController::categoriesDelete
 * @see app/Http/Controllers/CategoryController.php:79
 * @route '/categories/{category}'
 */
export const categoriesDelete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: categoriesDelete.url(args, options),
    method: 'delete',
})

categoriesDelete.definition = {
    methods: ["delete"],
    url: '/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CategoryController::categoriesDelete
 * @see app/Http/Controllers/CategoryController.php:79
 * @route '/categories/{category}'
 */
categoriesDelete.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return categoriesDelete.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::categoriesDelete
 * @see app/Http/Controllers/CategoryController.php:79
 * @route '/categories/{category}'
 */
categoriesDelete.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: categoriesDelete.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CategoryController::categoriesDelete
 * @see app/Http/Controllers/CategoryController.php:79
 * @route '/categories/{category}'
 */
    const categoriesDeleteForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: categoriesDelete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CategoryController::categoriesDelete
 * @see app/Http/Controllers/CategoryController.php:79
 * @route '/categories/{category}'
 */
        categoriesDeleteForm.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: categoriesDelete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    categoriesDelete.form = categoriesDeleteForm
/**
* @see \App\Http\Controllers\TicketController::tickets
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
export const tickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tickets.url(options),
    method: 'get',
})

tickets.definition = {
    methods: ["get","head"],
    url: '/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::tickets
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
tickets.url = (options?: RouteQueryOptions) => {
    return tickets.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::tickets
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
tickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tickets.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicketController::tickets
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
tickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tickets.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TicketController::tickets
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
    const ticketsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: tickets.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TicketController::tickets
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
        ticketsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tickets.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TicketController::tickets
 * @see app/Http/Controllers/TicketController.php:27
 * @route '/tickets'
 */
        ticketsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tickets.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    tickets.form = ticketsForm
/**
* @see \App\Http\Controllers\TicketController::ticketsCreate
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
export const ticketsCreate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ticketsCreate.url(options),
    method: 'get',
})

ticketsCreate.definition = {
    methods: ["get","head"],
    url: '/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsCreate
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
ticketsCreate.url = (options?: RouteQueryOptions) => {
    return ticketsCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsCreate
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
ticketsCreate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ticketsCreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicketController::ticketsCreate
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
ticketsCreate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ticketsCreate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsCreate
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
    const ticketsCreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ticketsCreate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsCreate
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
        ticketsCreateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ticketsCreate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TicketController::ticketsCreate
 * @see app/Http/Controllers/TicketController.php:46
 * @route '/tickets/create'
 */
        ticketsCreateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ticketsCreate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ticketsCreate.form = ticketsCreateForm
/**
* @see \App\Http\Controllers\TicketController::ticketsStore
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
export const ticketsStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ticketsStore.url(options),
    method: 'post',
})

ticketsStore.definition = {
    methods: ["post"],
    url: '/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsStore
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
ticketsStore.url = (options?: RouteQueryOptions) => {
    return ticketsStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsStore
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
ticketsStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ticketsStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsStore
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
    const ticketsStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ticketsStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsStore
 * @see app/Http/Controllers/TicketController.php:56
 * @route '/tickets'
 */
        ticketsStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ticketsStore.url(options),
            method: 'post',
        })
    
    ticketsStore.form = ticketsStoreForm
/**
* @see \App\Http\Controllers\TicketController::ticketsShow
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
export const ticketsShow = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ticketsShow.url(args, options),
    method: 'get',
})

ticketsShow.definition = {
    methods: ["get","head"],
    url: '/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsShow
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
ticketsShow.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ticketsShow.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsShow
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
ticketsShow.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ticketsShow.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicketController::ticketsShow
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
ticketsShow.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ticketsShow.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsShow
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
    const ticketsShowForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ticketsShow.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsShow
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
        ticketsShowForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ticketsShow.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TicketController::ticketsShow
 * @see app/Http/Controllers/TicketController.php:67
 * @route '/tickets/{ticket}'
 */
        ticketsShowForm.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ticketsShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ticketsShow.form = ticketsShowForm
/**
* @see \App\Http\Controllers\TicketController::ticketsEdit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
export const ticketsEdit = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ticketsEdit.url(args, options),
    method: 'get',
})

ticketsEdit.definition = {
    methods: ["get","head"],
    url: '/tickets/{ticket}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsEdit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
ticketsEdit.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ticketsEdit.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsEdit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
ticketsEdit.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ticketsEdit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicketController::ticketsEdit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
ticketsEdit.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ticketsEdit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsEdit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
    const ticketsEditForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ticketsEdit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsEdit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
        ticketsEditForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ticketsEdit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TicketController::ticketsEdit
 * @see app/Http/Controllers/TicketController.php:77
 * @route '/tickets/{ticket}/edit'
 */
        ticketsEditForm.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ticketsEdit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ticketsEdit.form = ticketsEditForm
/**
* @see \App\Http\Controllers\TicketController::ticketsUpdate
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
export const ticketsUpdate = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: ticketsUpdate.url(args, options),
    method: 'put',
})

ticketsUpdate.definition = {
    methods: ["put"],
    url: '/tickets/{ticket}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsUpdate
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
ticketsUpdate.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ticketsUpdate.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsUpdate
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
ticketsUpdate.put = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: ticketsUpdate.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsUpdate
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
    const ticketsUpdateForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ticketsUpdate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsUpdate
 * @see app/Http/Controllers/TicketController.php:88
 * @route '/tickets/{ticket}'
 */
        ticketsUpdateForm.put = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ticketsUpdate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    ticketsUpdate.form = ticketsUpdateForm
/**
* @see \App\Http\Controllers\TicketController::ticketsDelete
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
export const ticketsDelete = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: ticketsDelete.url(args, options),
    method: 'delete',
})

ticketsDelete.definition = {
    methods: ["delete"],
    url: '/tickets/{ticket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsDelete
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
ticketsDelete.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ticketsDelete.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsDelete
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
ticketsDelete.delete = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: ticketsDelete.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsDelete
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
    const ticketsDeleteForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ticketsDelete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsDelete
 * @see app/Http/Controllers/TicketController.php:96
 * @route '/tickets/{ticket}'
 */
        ticketsDeleteForm.delete = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ticketsDelete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    ticketsDelete.form = ticketsDeleteForm
/**
* @see \App\Http\Controllers\TicketController::ticketsAssign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
export const ticketsAssign = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ticketsAssign.url(args, options),
    method: 'post',
})

ticketsAssign.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsAssign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
ticketsAssign.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ticketsAssign.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsAssign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
ticketsAssign.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ticketsAssign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsAssign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
    const ticketsAssignForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ticketsAssign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsAssign
 * @see app/Http/Controllers/TicketController.php:106
 * @route '/tickets/{ticket}/assign'
 */
        ticketsAssignForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ticketsAssign.url(args, options),
            method: 'post',
        })
    
    ticketsAssign.form = ticketsAssignForm
/**
* @see \App\Http\Controllers\TicketController::ticketsStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
export const ticketsStatus = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ticketsStatus.url(args, options),
    method: 'post',
})

ticketsStatus.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
ticketsStatus.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ticketsStatus.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
ticketsStatus.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ticketsStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
    const ticketsStatusForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ticketsStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsStatus
 * @see app/Http/Controllers/TicketController.php:117
 * @route '/tickets/{ticket}/status'
 */
        ticketsStatusForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ticketsStatus.url(args, options),
            method: 'post',
        })
    
    ticketsStatus.form = ticketsStatusForm
/**
* @see \App\Http\Controllers\TicketController::ticketsComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
export const ticketsComment = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ticketsComment.url(args, options),
    method: 'post',
})

ticketsComment.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/comment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TicketController::ticketsComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
ticketsComment.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ticketsComment.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::ticketsComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
ticketsComment.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ticketsComment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TicketController::ticketsComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
    const ticketsCommentForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ticketsComment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TicketController::ticketsComment
 * @see app/Http/Controllers/TicketController.php:132
 * @route '/tickets/{ticket}/comment'
 */
        ticketsCommentForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ticketsComment.url(args, options),
            method: 'post',
        })
    
    ticketsComment.form = ticketsCommentForm
/**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:18
 * @route '/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:18
 * @route '/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:18
 * @route '/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:18
 * @route '/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:18
 * @route '/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:18
 * @route '/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserController::users
 * @see app/Http/Controllers/Admin/UserController.php:18
 * @route '/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
/**
* @see \App\Http\Controllers\Admin\UserController::usersCreate
 * @see app/Http/Controllers/Admin/UserController.php:38
 * @route '/users/create'
 */
export const usersCreate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usersCreate.url(options),
    method: 'get',
})

usersCreate.definition = {
    methods: ["get","head"],
    url: '/users/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserController::usersCreate
 * @see app/Http/Controllers/Admin/UserController.php:38
 * @route '/users/create'
 */
usersCreate.url = (options?: RouteQueryOptions) => {
    return usersCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserController::usersCreate
 * @see app/Http/Controllers/Admin/UserController.php:38
 * @route '/users/create'
 */
usersCreate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usersCreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserController::usersCreate
 * @see app/Http/Controllers/Admin/UserController.php:38
 * @route '/users/create'
 */
usersCreate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: usersCreate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserController::usersCreate
 * @see app/Http/Controllers/Admin/UserController.php:38
 * @route '/users/create'
 */
    const usersCreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: usersCreate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserController::usersCreate
 * @see app/Http/Controllers/Admin/UserController.php:38
 * @route '/users/create'
 */
        usersCreateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usersCreate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserController::usersCreate
 * @see app/Http/Controllers/Admin/UserController.php:38
 * @route '/users/create'
 */
        usersCreateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usersCreate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    usersCreate.form = usersCreateForm
/**
* @see \App\Http\Controllers\Admin\UserController::usersStore
 * @see app/Http/Controllers/Admin/UserController.php:48
 * @route '/users'
 */
export const usersStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: usersStore.url(options),
    method: 'post',
})

usersStore.definition = {
    methods: ["post"],
    url: '/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\UserController::usersStore
 * @see app/Http/Controllers/Admin/UserController.php:48
 * @route '/users'
 */
usersStore.url = (options?: RouteQueryOptions) => {
    return usersStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserController::usersStore
 * @see app/Http/Controllers/Admin/UserController.php:48
 * @route '/users'
 */
usersStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: usersStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\UserController::usersStore
 * @see app/Http/Controllers/Admin/UserController.php:48
 * @route '/users'
 */
    const usersStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: usersStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UserController::usersStore
 * @see app/Http/Controllers/Admin/UserController.php:48
 * @route '/users'
 */
        usersStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: usersStore.url(options),
            method: 'post',
        })
    
    usersStore.form = usersStoreForm
/**
* @see \App\Http\Controllers\Admin\UserController::usersEdit
 * @see app/Http/Controllers/Admin/UserController.php:73
 * @route '/users/{user}/edit'
 */
export const usersEdit = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usersEdit.url(args, options),
    method: 'get',
})

usersEdit.definition = {
    methods: ["get","head"],
    url: '/users/{user}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UserController::usersEdit
 * @see app/Http/Controllers/Admin/UserController.php:73
 * @route '/users/{user}/edit'
 */
usersEdit.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return usersEdit.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserController::usersEdit
 * @see app/Http/Controllers/Admin/UserController.php:73
 * @route '/users/{user}/edit'
 */
usersEdit.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usersEdit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UserController::usersEdit
 * @see app/Http/Controllers/Admin/UserController.php:73
 * @route '/users/{user}/edit'
 */
usersEdit.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: usersEdit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UserController::usersEdit
 * @see app/Http/Controllers/Admin/UserController.php:73
 * @route '/users/{user}/edit'
 */
    const usersEditForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: usersEdit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UserController::usersEdit
 * @see app/Http/Controllers/Admin/UserController.php:73
 * @route '/users/{user}/edit'
 */
        usersEditForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usersEdit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UserController::usersEdit
 * @see app/Http/Controllers/Admin/UserController.php:73
 * @route '/users/{user}/edit'
 */
        usersEditForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usersEdit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    usersEdit.form = usersEditForm
/**
* @see \App\Http\Controllers\Admin\UserController::usersUpdate
 * @see app/Http/Controllers/Admin/UserController.php:89
 * @route '/users/{user}'
 */
export const usersUpdate = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: usersUpdate.url(args, options),
    method: 'put',
})

usersUpdate.definition = {
    methods: ["put"],
    url: '/users/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\UserController::usersUpdate
 * @see app/Http/Controllers/Admin/UserController.php:89
 * @route '/users/{user}'
 */
usersUpdate.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return usersUpdate.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserController::usersUpdate
 * @see app/Http/Controllers/Admin/UserController.php:89
 * @route '/users/{user}'
 */
usersUpdate.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: usersUpdate.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\UserController::usersUpdate
 * @see app/Http/Controllers/Admin/UserController.php:89
 * @route '/users/{user}'
 */
    const usersUpdateForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: usersUpdate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UserController::usersUpdate
 * @see app/Http/Controllers/Admin/UserController.php:89
 * @route '/users/{user}'
 */
        usersUpdateForm.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: usersUpdate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    usersUpdate.form = usersUpdateForm
/**
* @see \App\Http\Controllers\Admin\UserController::usersDelete
 * @see app/Http/Controllers/Admin/UserController.php:116
 * @route '/users/{user}'
 */
export const usersDelete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: usersDelete.url(args, options),
    method: 'delete',
})

usersDelete.definition = {
    methods: ["delete"],
    url: '/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\UserController::usersDelete
 * @see app/Http/Controllers/Admin/UserController.php:116
 * @route '/users/{user}'
 */
usersDelete.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return usersDelete.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UserController::usersDelete
 * @see app/Http/Controllers/Admin/UserController.php:116
 * @route '/users/{user}'
 */
usersDelete.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: usersDelete.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\UserController::usersDelete
 * @see app/Http/Controllers/Admin/UserController.php:116
 * @route '/users/{user}'
 */
    const usersDeleteForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: usersDelete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UserController::usersDelete
 * @see app/Http/Controllers/Admin/UserController.php:116
 * @route '/users/{user}'
 */
        usersDeleteForm.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: usersDelete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    usersDelete.form = usersDeleteForm
/**
* @see \App\Http\Controllers\AssetController::assets
 * @see app/Http/Controllers/AssetController.php:16
 * @route '/assets'
 */
export const assets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assets.url(options),
    method: 'get',
})

assets.definition = {
    methods: ["get","head"],
    url: '/assets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::assets
 * @see app/Http/Controllers/AssetController.php:16
 * @route '/assets'
 */
assets.url = (options?: RouteQueryOptions) => {
    return assets.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assets
 * @see app/Http/Controllers/AssetController.php:16
 * @route '/assets'
 */
assets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assets.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::assets
 * @see app/Http/Controllers/AssetController.php:16
 * @route '/assets'
 */
assets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assets.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::assets
 * @see app/Http/Controllers/AssetController.php:16
 * @route '/assets'
 */
    const assetsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assets.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::assets
 * @see app/Http/Controllers/AssetController.php:16
 * @route '/assets'
 */
        assetsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assets.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::assets
 * @see app/Http/Controllers/AssetController.php:16
 * @route '/assets'
 */
        assetsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assets.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assets.form = assetsForm
/**
* @see \App\Http\Controllers\AssetController::assetsCreate
 * @see app/Http/Controllers/AssetController.php:44
 * @route '/assets/create'
 */
export const assetsCreate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsCreate.url(options),
    method: 'get',
})

assetsCreate.definition = {
    methods: ["get","head"],
    url: '/assets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::assetsCreate
 * @see app/Http/Controllers/AssetController.php:44
 * @route '/assets/create'
 */
assetsCreate.url = (options?: RouteQueryOptions) => {
    return assetsCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assetsCreate
 * @see app/Http/Controllers/AssetController.php:44
 * @route '/assets/create'
 */
assetsCreate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsCreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::assetsCreate
 * @see app/Http/Controllers/AssetController.php:44
 * @route '/assets/create'
 */
assetsCreate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assetsCreate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::assetsCreate
 * @see app/Http/Controllers/AssetController.php:44
 * @route '/assets/create'
 */
    const assetsCreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assetsCreate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::assetsCreate
 * @see app/Http/Controllers/AssetController.php:44
 * @route '/assets/create'
 */
        assetsCreateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsCreate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::assetsCreate
 * @see app/Http/Controllers/AssetController.php:44
 * @route '/assets/create'
 */
        assetsCreateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsCreate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assetsCreate.form = assetsCreateForm
/**
* @see \App\Http\Controllers\AssetController::assetsStore
 * @see app/Http/Controllers/AssetController.php:77
 * @route '/assets'
 */
export const assetsStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assetsStore.url(options),
    method: 'post',
})

assetsStore.definition = {
    methods: ["post"],
    url: '/assets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssetController::assetsStore
 * @see app/Http/Controllers/AssetController.php:77
 * @route '/assets'
 */
assetsStore.url = (options?: RouteQueryOptions) => {
    return assetsStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assetsStore
 * @see app/Http/Controllers/AssetController.php:77
 * @route '/assets'
 */
assetsStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assetsStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssetController::assetsStore
 * @see app/Http/Controllers/AssetController.php:77
 * @route '/assets'
 */
    const assetsStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assetsStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetController::assetsStore
 * @see app/Http/Controllers/AssetController.php:77
 * @route '/assets'
 */
        assetsStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assetsStore.url(options),
            method: 'post',
        })
    
    assetsStore.form = assetsStoreForm
/**
* @see \App\Http\Controllers\AssetController::assetsEdit
 * @see app/Http/Controllers/AssetController.php:66
 * @route '/assets/{asset}/edit'
 */
export const assetsEdit = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsEdit.url(args, options),
    method: 'get',
})

assetsEdit.definition = {
    methods: ["get","head"],
    url: '/assets/{asset}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::assetsEdit
 * @see app/Http/Controllers/AssetController.php:66
 * @route '/assets/{asset}/edit'
 */
assetsEdit.url = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset: args.asset,
                }

    return assetsEdit.definition.url
            .replace('{asset}', parsedArgs.asset.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assetsEdit
 * @see app/Http/Controllers/AssetController.php:66
 * @route '/assets/{asset}/edit'
 */
assetsEdit.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsEdit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::assetsEdit
 * @see app/Http/Controllers/AssetController.php:66
 * @route '/assets/{asset}/edit'
 */
assetsEdit.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assetsEdit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::assetsEdit
 * @see app/Http/Controllers/AssetController.php:66
 * @route '/assets/{asset}/edit'
 */
    const assetsEditForm = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assetsEdit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::assetsEdit
 * @see app/Http/Controllers/AssetController.php:66
 * @route '/assets/{asset}/edit'
 */
        assetsEditForm.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsEdit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::assetsEdit
 * @see app/Http/Controllers/AssetController.php:66
 * @route '/assets/{asset}/edit'
 */
        assetsEditForm.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsEdit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assetsEdit.form = assetsEditForm
/**
* @see \App\Http\Controllers\AssetController::assetsUpdate
 * @see app/Http/Controllers/AssetController.php:104
 * @route '/assets/{asset}'
 */
export const assetsUpdate = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: assetsUpdate.url(args, options),
    method: 'put',
})

assetsUpdate.definition = {
    methods: ["put"],
    url: '/assets/{asset}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AssetController::assetsUpdate
 * @see app/Http/Controllers/AssetController.php:104
 * @route '/assets/{asset}'
 */
assetsUpdate.url = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset: args.asset,
                }

    return assetsUpdate.definition.url
            .replace('{asset}', parsedArgs.asset.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assetsUpdate
 * @see app/Http/Controllers/AssetController.php:104
 * @route '/assets/{asset}'
 */
assetsUpdate.put = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: assetsUpdate.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AssetController::assetsUpdate
 * @see app/Http/Controllers/AssetController.php:104
 * @route '/assets/{asset}'
 */
    const assetsUpdateForm = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assetsUpdate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetController::assetsUpdate
 * @see app/Http/Controllers/AssetController.php:104
 * @route '/assets/{asset}'
 */
        assetsUpdateForm.put = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assetsUpdate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    assetsUpdate.form = assetsUpdateForm
/**
* @see \App\Http\Controllers\AssetController::assetsDelete
 * @see app/Http/Controllers/AssetController.php:123
 * @route '/assets/{asset}'
 */
export const assetsDelete = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: assetsDelete.url(args, options),
    method: 'delete',
})

assetsDelete.definition = {
    methods: ["delete"],
    url: '/assets/{asset}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AssetController::assetsDelete
 * @see app/Http/Controllers/AssetController.php:123
 * @route '/assets/{asset}'
 */
assetsDelete.url = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset: args.asset,
                }

    return assetsDelete.definition.url
            .replace('{asset}', parsedArgs.asset.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assetsDelete
 * @see app/Http/Controllers/AssetController.php:123
 * @route '/assets/{asset}'
 */
assetsDelete.delete = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: assetsDelete.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AssetController::assetsDelete
 * @see app/Http/Controllers/AssetController.php:123
 * @route '/assets/{asset}'
 */
    const assetsDeleteForm = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assetsDelete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetController::assetsDelete
 * @see app/Http/Controllers/AssetController.php:123
 * @route '/assets/{asset}'
 */
        assetsDeleteForm.delete = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assetsDelete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    assetsDelete.form = assetsDeleteForm
/**
* @see \App\Http\Controllers\AssetController::assetsDetail
 * @see app/Http/Controllers/AssetController.php:52
 * @route '/assets/{asset}/show'
 */
export const assetsDetail = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsDetail.url(args, options),
    method: 'get',
})

assetsDetail.definition = {
    methods: ["get","head"],
    url: '/assets/{asset}/show',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::assetsDetail
 * @see app/Http/Controllers/AssetController.php:52
 * @route '/assets/{asset}/show'
 */
assetsDetail.url = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset: args.asset,
                }

    return assetsDetail.definition.url
            .replace('{asset}', parsedArgs.asset.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assetsDetail
 * @see app/Http/Controllers/AssetController.php:52
 * @route '/assets/{asset}/show'
 */
assetsDetail.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsDetail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::assetsDetail
 * @see app/Http/Controllers/AssetController.php:52
 * @route '/assets/{asset}/show'
 */
assetsDetail.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assetsDetail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::assetsDetail
 * @see app/Http/Controllers/AssetController.php:52
 * @route '/assets/{asset}/show'
 */
    const assetsDetailForm = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assetsDetail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::assetsDetail
 * @see app/Http/Controllers/AssetController.php:52
 * @route '/assets/{asset}/show'
 */
        assetsDetailForm.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsDetail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::assetsDetail
 * @see app/Http/Controllers/AssetController.php:52
 * @route '/assets/{asset}/show'
 */
        assetsDetailForm.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsDetail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assetsDetail.form = assetsDetailForm
/**
* @see \App\Http\Controllers\AssetController::assetsPrintLabel
 * @see app/Http/Controllers/AssetController.php:148
 * @route '/assets/{asset}/print-label'
 */
export const assetsPrintLabel = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsPrintLabel.url(args, options),
    method: 'get',
})

assetsPrintLabel.definition = {
    methods: ["get","head"],
    url: '/assets/{asset}/print-label',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::assetsPrintLabel
 * @see app/Http/Controllers/AssetController.php:148
 * @route '/assets/{asset}/print-label'
 */
assetsPrintLabel.url = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset: args.asset,
                }

    return assetsPrintLabel.definition.url
            .replace('{asset}', parsedArgs.asset.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assetsPrintLabel
 * @see app/Http/Controllers/AssetController.php:148
 * @route '/assets/{asset}/print-label'
 */
assetsPrintLabel.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsPrintLabel.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::assetsPrintLabel
 * @see app/Http/Controllers/AssetController.php:148
 * @route '/assets/{asset}/print-label'
 */
assetsPrintLabel.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assetsPrintLabel.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::assetsPrintLabel
 * @see app/Http/Controllers/AssetController.php:148
 * @route '/assets/{asset}/print-label'
 */
    const assetsPrintLabelForm = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assetsPrintLabel.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::assetsPrintLabel
 * @see app/Http/Controllers/AssetController.php:148
 * @route '/assets/{asset}/print-label'
 */
        assetsPrintLabelForm.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsPrintLabel.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::assetsPrintLabel
 * @see app/Http/Controllers/AssetController.php:148
 * @route '/assets/{asset}/print-label'
 */
        assetsPrintLabelForm.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsPrintLabel.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assetsPrintLabel.form = assetsPrintLabelForm
/**
* @see \App\Http\Controllers\LocationController::locations
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/locations'
 */
export const locations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locations.url(options),
    method: 'get',
})

locations.definition = {
    methods: ["get","head"],
    url: '/locations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationController::locations
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/locations'
 */
locations.url = (options?: RouteQueryOptions) => {
    return locations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::locations
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/locations'
 */
locations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locations.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocationController::locations
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/locations'
 */
locations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: locations.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocationController::locations
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/locations'
 */
    const locationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: locations.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocationController::locations
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/locations'
 */
        locationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: locations.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocationController::locations
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/locations'
 */
        locationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: locations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    locations.form = locationsForm
/**
* @see \App\Http\Controllers\LocationController::locationsStore
 * @see app/Http/Controllers/LocationController.php:23
 * @route '/locations'
 */
export const locationsStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: locationsStore.url(options),
    method: 'post',
})

locationsStore.definition = {
    methods: ["post"],
    url: '/locations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LocationController::locationsStore
 * @see app/Http/Controllers/LocationController.php:23
 * @route '/locations'
 */
locationsStore.url = (options?: RouteQueryOptions) => {
    return locationsStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::locationsStore
 * @see app/Http/Controllers/LocationController.php:23
 * @route '/locations'
 */
locationsStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: locationsStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\LocationController::locationsStore
 * @see app/Http/Controllers/LocationController.php:23
 * @route '/locations'
 */
    const locationsStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: locationsStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LocationController::locationsStore
 * @see app/Http/Controllers/LocationController.php:23
 * @route '/locations'
 */
        locationsStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: locationsStore.url(options),
            method: 'post',
        })
    
    locationsStore.form = locationsStoreForm
/**
* @see \App\Http\Controllers\LocationController::locationsUpdate
 * @see app/Http/Controllers/LocationController.php:42
 * @route '/locations/{location}'
 */
export const locationsUpdate = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: locationsUpdate.url(args, options),
    method: 'put',
})

locationsUpdate.definition = {
    methods: ["put"],
    url: '/locations/{location}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\LocationController::locationsUpdate
 * @see app/Http/Controllers/LocationController.php:42
 * @route '/locations/{location}'
 */
locationsUpdate.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { location: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    location: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        location: typeof args.location === 'object'
                ? args.location.id
                : args.location,
                }

    return locationsUpdate.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::locationsUpdate
 * @see app/Http/Controllers/LocationController.php:42
 * @route '/locations/{location}'
 */
locationsUpdate.put = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: locationsUpdate.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\LocationController::locationsUpdate
 * @see app/Http/Controllers/LocationController.php:42
 * @route '/locations/{location}'
 */
    const locationsUpdateForm = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: locationsUpdate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LocationController::locationsUpdate
 * @see app/Http/Controllers/LocationController.php:42
 * @route '/locations/{location}'
 */
        locationsUpdateForm.put = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: locationsUpdate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    locationsUpdate.form = locationsUpdateForm
/**
* @see \App\Http\Controllers\LocationController::locationsDelete
 * @see app/Http/Controllers/LocationController.php:61
 * @route '/locations/{location}'
 */
export const locationsDelete = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: locationsDelete.url(args, options),
    method: 'delete',
})

locationsDelete.definition = {
    methods: ["delete"],
    url: '/locations/{location}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\LocationController::locationsDelete
 * @see app/Http/Controllers/LocationController.php:61
 * @route '/locations/{location}'
 */
locationsDelete.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { location: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    location: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        location: typeof args.location === 'object'
                ? args.location.id
                : args.location,
                }

    return locationsDelete.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::locationsDelete
 * @see app/Http/Controllers/LocationController.php:61
 * @route '/locations/{location}'
 */
locationsDelete.delete = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: locationsDelete.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\LocationController::locationsDelete
 * @see app/Http/Controllers/LocationController.php:61
 * @route '/locations/{location}'
 */
    const locationsDeleteForm = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: locationsDelete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LocationController::locationsDelete
 * @see app/Http/Controllers/LocationController.php:61
 * @route '/locations/{location}'
 */
        locationsDeleteForm.delete = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: locationsDelete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    locationsDelete.form = locationsDeleteForm
/**
* @see \App\Http\Controllers\MaintenanceController::maintenances
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
export const maintenances = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenances.url(options),
    method: 'get',
})

maintenances.definition = {
    methods: ["get","head"],
    url: '/maintenances',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceController::maintenances
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
maintenances.url = (options?: RouteQueryOptions) => {
    return maintenances.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::maintenances
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
maintenances.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenances.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceController::maintenances
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
maintenances.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: maintenances.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::maintenances
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
    const maintenancesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: maintenances.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::maintenances
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
        maintenancesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenances.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceController::maintenances
 * @see app/Http/Controllers/MaintenanceController.php:14
 * @route '/maintenances'
 */
        maintenancesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenances.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    maintenances.form = maintenancesForm
/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesCreate
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
export const maintenancesCreate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenancesCreate.url(options),
    method: 'get',
})

maintenancesCreate.definition = {
    methods: ["get","head"],
    url: '/maintenances/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesCreate
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
maintenancesCreate.url = (options?: RouteQueryOptions) => {
    return maintenancesCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesCreate
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
maintenancesCreate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenancesCreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesCreate
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
maintenancesCreate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: maintenancesCreate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesCreate
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
    const maintenancesCreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: maintenancesCreate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesCreate
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
        maintenancesCreateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenancesCreate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesCreate
 * @see app/Http/Controllers/MaintenanceController.php:87
 * @route '/maintenances/create'
 */
        maintenancesCreateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenancesCreate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    maintenancesCreate.form = maintenancesCreateForm
/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesStore
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
export const maintenancesStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: maintenancesStore.url(options),
    method: 'post',
})

maintenancesStore.definition = {
    methods: ["post"],
    url: '/maintenances',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesStore
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
maintenancesStore.url = (options?: RouteQueryOptions) => {
    return maintenancesStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesStore
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
maintenancesStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: maintenancesStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesStore
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
    const maintenancesStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: maintenancesStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesStore
 * @see app/Http/Controllers/MaintenanceController.php:117
 * @route '/maintenances'
 */
        maintenancesStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: maintenancesStore.url(options),
            method: 'post',
        })
    
    maintenancesStore.form = maintenancesStoreForm
/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesEdit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
export const maintenancesEdit = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenancesEdit.url(args, options),
    method: 'get',
})

maintenancesEdit.definition = {
    methods: ["get","head"],
    url: '/maintenances/{maintenance}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesEdit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
maintenancesEdit.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return maintenancesEdit.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesEdit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
maintenancesEdit.get = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenancesEdit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesEdit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
maintenancesEdit.head = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: maintenancesEdit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesEdit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
    const maintenancesEditForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: maintenancesEdit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesEdit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
        maintenancesEditForm.get = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenancesEdit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesEdit
 * @see app/Http/Controllers/MaintenanceController.php:100
 * @route '/maintenances/{maintenance}/edit'
 */
        maintenancesEditForm.head = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenancesEdit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    maintenancesEdit.form = maintenancesEditForm
/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesUpdate
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
export const maintenancesUpdate = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: maintenancesUpdate.url(args, options),
    method: 'put',
})

maintenancesUpdate.definition = {
    methods: ["put"],
    url: '/maintenances/{maintenance}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesUpdate
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
maintenancesUpdate.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return maintenancesUpdate.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesUpdate
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
maintenancesUpdate.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: maintenancesUpdate.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesUpdate
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
    const maintenancesUpdateForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: maintenancesUpdate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesUpdate
 * @see app/Http/Controllers/MaintenanceController.php:172
 * @route '/maintenances/{maintenance}'
 */
        maintenancesUpdateForm.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: maintenancesUpdate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    maintenancesUpdate.form = maintenancesUpdateForm
/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesDelete
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
export const maintenancesDelete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: maintenancesDelete.url(args, options),
    method: 'delete',
})

maintenancesDelete.definition = {
    methods: ["delete"],
    url: '/maintenances/{maintenance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesDelete
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
maintenancesDelete.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return maintenancesDelete.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceController::maintenancesDelete
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
maintenancesDelete.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: maintenancesDelete.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesDelete
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
    const maintenancesDeleteForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: maintenancesDelete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceController::maintenancesDelete
 * @see app/Http/Controllers/MaintenanceController.php:223
 * @route '/maintenances/{maintenance}'
 */
        maintenancesDeleteForm.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: maintenancesDelete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    maintenancesDelete.form = maintenancesDeleteForm
/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskIndex
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
export const helpdeskIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: helpdeskIndex.url(options),
    method: 'get',
})

helpdeskIndex.definition = {
    methods: ["get","head"],
    url: '/helpdesk/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskIndex
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
helpdeskIndex.url = (options?: RouteQueryOptions) => {
    return helpdeskIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskIndex
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
helpdeskIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: helpdeskIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskIndex
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
helpdeskIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: helpdeskIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskIndex
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
    const helpdeskIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: helpdeskIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskIndex
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
        helpdeskIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: helpdeskIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskIndex
 * @see app/Http/Controllers/HelpdeskController.php:24
 * @route '/helpdesk/tickets'
 */
        helpdeskIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: helpdeskIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    helpdeskIndex.form = helpdeskIndexForm
/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskCreate
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
export const helpdeskCreate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: helpdeskCreate.url(options),
    method: 'get',
})

helpdeskCreate.definition = {
    methods: ["get","head"],
    url: '/helpdesk/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskCreate
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
helpdeskCreate.url = (options?: RouteQueryOptions) => {
    return helpdeskCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskCreate
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
helpdeskCreate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: helpdeskCreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskCreate
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
helpdeskCreate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: helpdeskCreate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskCreate
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
    const helpdeskCreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: helpdeskCreate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskCreate
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
        helpdeskCreateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: helpdeskCreate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskCreate
 * @see app/Http/Controllers/HelpdeskController.php:45
 * @route '/helpdesk/tickets/create'
 */
        helpdeskCreateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: helpdeskCreate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    helpdeskCreate.form = helpdeskCreateForm
/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskStore
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
export const helpdeskStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: helpdeskStore.url(options),
    method: 'post',
})

helpdeskStore.definition = {
    methods: ["post"],
    url: '/helpdesk/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskStore
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
helpdeskStore.url = (options?: RouteQueryOptions) => {
    return helpdeskStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskStore
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
helpdeskStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: helpdeskStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskStore
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
    const helpdeskStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: helpdeskStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskStore
 * @see app/Http/Controllers/HelpdeskController.php:54
 * @route '/helpdesk/tickets'
 */
        helpdeskStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: helpdeskStore.url(options),
            method: 'post',
        })
    
    helpdeskStore.form = helpdeskStoreForm
/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskShow
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
export const helpdeskShow = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: helpdeskShow.url(args, options),
    method: 'get',
})

helpdeskShow.definition = {
    methods: ["get","head"],
    url: '/helpdesk/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskShow
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
helpdeskShow.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return helpdeskShow.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskShow
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
helpdeskShow.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: helpdeskShow.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskShow
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
helpdeskShow.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: helpdeskShow.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskShow
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
    const helpdeskShowForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: helpdeskShow.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskShow
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
        helpdeskShowForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: helpdeskShow.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskShow
 * @see app/Http/Controllers/HelpdeskController.php:66
 * @route '/helpdesk/tickets/{ticket}'
 */
        helpdeskShowForm.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: helpdeskShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    helpdeskShow.form = helpdeskShowForm
/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
export const helpdeskComment = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: helpdeskComment.url(args, options),
    method: 'post',
})

helpdeskComment.definition = {
    methods: ["post"],
    url: '/helpdesk/tickets/{ticket}/comment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
helpdeskComment.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return helpdeskComment.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HelpdeskController::helpdeskComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
helpdeskComment.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: helpdeskComment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
    const helpdeskCommentForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: helpdeskComment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HelpdeskController::helpdeskComment
 * @see app/Http/Controllers/HelpdeskController.php:82
 * @route '/helpdesk/tickets/{ticket}/comment'
 */
        helpdeskCommentForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: helpdeskComment.url(args, options),
            method: 'post',
        })
    
    helpdeskComment.form = helpdeskCommentForm
/**
* @see \App\Http\Controllers\AssetController::assetsQrcodeDetail
 * @see app/Http/Controllers/AssetController.php:131
 * @route '/assets/{asset}/qrcode-detail'
 */
export const assetsQrcodeDetail = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsQrcodeDetail.url(args, options),
    method: 'get',
})

assetsQrcodeDetail.definition = {
    methods: ["get","head"],
    url: '/assets/{asset}/qrcode-detail',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::assetsQrcodeDetail
 * @see app/Http/Controllers/AssetController.php:131
 * @route '/assets/{asset}/qrcode-detail'
 */
assetsQrcodeDetail.url = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset: args.asset,
                }

    return assetsQrcodeDetail.definition.url
            .replace('{asset}', parsedArgs.asset.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::assetsQrcodeDetail
 * @see app/Http/Controllers/AssetController.php:131
 * @route '/assets/{asset}/qrcode-detail'
 */
assetsQrcodeDetail.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assetsQrcodeDetail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::assetsQrcodeDetail
 * @see app/Http/Controllers/AssetController.php:131
 * @route '/assets/{asset}/qrcode-detail'
 */
assetsQrcodeDetail.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assetsQrcodeDetail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::assetsQrcodeDetail
 * @see app/Http/Controllers/AssetController.php:131
 * @route '/assets/{asset}/qrcode-detail'
 */
    const assetsQrcodeDetailForm = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assetsQrcodeDetail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::assetsQrcodeDetail
 * @see app/Http/Controllers/AssetController.php:131
 * @route '/assets/{asset}/qrcode-detail'
 */
        assetsQrcodeDetailForm.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsQrcodeDetail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::assetsQrcodeDetail
 * @see app/Http/Controllers/AssetController.php:131
 * @route '/assets/{asset}/qrcode-detail'
 */
        assetsQrcodeDetailForm.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assetsQrcodeDetail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assetsQrcodeDetail.form = assetsQrcodeDetailForm