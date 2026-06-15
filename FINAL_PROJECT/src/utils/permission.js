const getPermissionsByRole = (role) => {

    if (role === 'admin') {
        return [
            'student:create',
            'student:update',
            'student:delete',
            'student:view'
        ];
    }

    if (role === 'manager') {
        return [
            'student:create',
            'student:view'
        ];
    }

    return ['student:view'];
};

module.exports = getPermissionsByRole;